from rest_framework import serializers

from .models import Store,Address,Location

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ('streetName', 'streetNumber', 'city', 'state','zipCode')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('latitude', 'longitude')

class StoreSerializer(serializers.ModelSerializer):
    address = AddressSerializer(required=True)
    location = LocationSerializer(required=True)
    class Meta:
        model = Store
        fields = ['imageUrl', 'name', 'contactPhone','location','address','id']
    
    def create(self, validated_data):
        address_data = validated_data.pop('address')
        location_data = validated_data.pop('location')
        address = AddressSerializer.create(AddressSerializer(), validated_data=address_data)
        location = LocationSerializer.create(LocationSerializer(), validated_data=location_data)
        store = Store.objects.create(address=address,location=location,**validated_data)
        return store

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.imageUrl = validated_data.get('imageUrl', instance.imageUrl)
        instance.contactPhone = validated_data.get('contactPhone', instance.contactPhone)
        
        address = validated_data.get('address', None)
        location = validated_data.get('location', None)
        if address is not None:
            address = AddressSerializer.update(AddressSerializer(),instance=instance.address, validated_data=address)
        if location is not None:
            location = LocationSerializer.update(LocationSerializer(),instance=instance.location, validated_data=location)
        instance.save()
            
        return instance


