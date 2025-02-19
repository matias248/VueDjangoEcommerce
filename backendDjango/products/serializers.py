from rest_framework import serializers

from stores.models import Store
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    storeId = serializers.PrimaryKeyRelatedField(source='store', queryset=Store.objects.all())
    class Meta:
        model = Product
        fields = ['imageUrl', 'name', 'currency','description',
        'inventoryStatus','category','price','id','storeId']

    
