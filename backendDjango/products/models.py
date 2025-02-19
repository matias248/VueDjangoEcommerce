from django.db import models
from stores.models import Store
# Create your models here.

class Product (models.Model):
    CATEGORY_CHOICES = [
        ('Accessories', 'Accessories'),
        ('Fitness', 'Fitness'),
        ('Electronics', 'Electronics'),
        ('Clothing', 'Clothing'),
    ]

    INVENTORY_STATUS_CHOICES = [
        ('INSTOCK', 'INSTOCK'),
        ('LOWSTOCK', 'LOWSTOCK'),
        ('OUTOFSTOCK', 'OUTOFSTOCK'),
    ]

    CURRENCY_CHOICES = [
        ('€', '€'),
        ('$', '$'),
        ('£', '£'),
    ]

    name = models.CharField(max_length=50)
    description = models.TextField()
    imageUrl = models.TextField(blank=True)
    price = models.FloatField()
    currency = models.TextField(choices=CURRENCY_CHOICES)
    category = models.TextField(choices=CATEGORY_CHOICES)
    inventoryStatus = models.TextField(choices=INVENTORY_STATUS_CHOICES)
    store =  models.ForeignKey(Store, on_delete=models.CASCADE)
