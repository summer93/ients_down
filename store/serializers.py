from store.models import *
from rest_framework import serializers


class PartLiveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = PartLive
        fields = ('id', 'QR_Code',)


class StoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Store
        fields = ('id', 'Name', 'Tell', 'Address', 'Company')

