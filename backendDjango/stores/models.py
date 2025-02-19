from django.db import models

# Create your models here.
class Address (models.Model):
    streetName = models.TextField(default='')
    streetNumber = models.TextField(default='')
    city = models.TextField(default='')
    state = models.TextField(default='')
    zipCode = models.TextField(default='')

def default_address():
    address = Address()
    address.save()
    return address.pk

class Location (models.Model):
    latitude = models.IntegerField(default=0)
    longitude = models.IntegerField(default=0)

def default_location():
    location = Location()
    location.save()
    return location.pk

def default_store():
    store = Store()
    store.save()
    return store.pk

class Store (models.Model):

    name = models.CharField(max_length=50,default="")
    imageUrl = models.TextField(default="",blank=True)
    contactPhone = models.TextField(default="",blank=True)
    address = models.OneToOneField(Address, on_delete=models.CASCADE,default=default_address)
    location = models.OneToOneField(Location, on_delete=models.CASCADE,default=default_location)

