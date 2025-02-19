from django.shortcuts import get_object_or_404, render

from stores.serializers import StoreSerializer
from .models import Product
from stores.models import Store
from rest_framework import viewsets
from .serializers import ProductSerializer
import django_filters
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'pagelength'
    max_page_size = 1000
    def get_paginated_response(self, data):
        return Response(data)
    
class ProductFilter(django_filters.FilterSet):
    categories = django_filters.BaseInFilter(field_name="category", lookup_expr="in")
    textfilter = django_filters.CharFilter(method='filter_name_description', label="textName")
    storeId = django_filters.NumberFilter(field_name="store__id")
     
    class Meta:
        model = Product
        fields = []

    def filter_name_description(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) |
            Q(description__icontains=value)
        )
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('id')
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    pagination_class = CustomPagination

    def destroy(self, request,pk=None):
        print(self)
        product = self.get_object()
        productResponse = ProductSerializer(product)
        product.delete()
        return Response(productResponse.data,status=200)

    
class ProductWithStoreViewSet(viewsets.ViewSet):
    
    def retrieve(self, request, pk=None,storeid=None):
        queryset = Product.objects.all()
        p = get_object_or_404(queryset,pk=pk)
        product = ProductSerializer(p)
        storeId = product.data.get('storeId')
        if int(storeid) != storeId:
            return Response("No product with this id in this store",status=404)
        store = StoreSerializer(p.store)
      
        return Response({"product":product.data,"store":store.data})
    
    def list(self,request,storeid=None):
        try:
            s = Store.objects.get(id=storeid)
        except ObjectDoesNotExist:
            return Response("Store not found",status=404)
        ps = s.product_set.all()
        store = StoreSerializer(s)
        products = ProductSerializer(ps,many=True)
        return Response({"products":products.data,"store":store.data})
    
    
