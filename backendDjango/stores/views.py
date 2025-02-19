from .models import Store
from rest_framework import viewsets
from .serializers import StoreSerializer
from rest_framework import filters


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all().order_by('id')
    serializer_class = StoreSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'address__zipCode','address__city']

    

class StoreProductViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.filter()
    serializer_class = StoreSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'address__zipCode','address__city']


