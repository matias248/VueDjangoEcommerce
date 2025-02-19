from django.urls import include, path
from rest_framework import routers
from .views import StoreProductViewSet, StoreViewSet

router = routers.DefaultRouter()
router.register('stores', StoreViewSet,basename='store')


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', include(router.urls)),
]