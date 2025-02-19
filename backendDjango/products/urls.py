from django.urls import include, path
from rest_framework import routers
from .views import ProductViewSet, ProductWithStoreViewSet

router = routers.DefaultRouter()
router.register('products', ProductViewSet,basename='product')
router.register('stores/(?P<storeid>\d+)/products', ProductWithStoreViewSet,basename='storewithproducts')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = router.urls