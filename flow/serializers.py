from flow.models import *
from rest_framework import serializers


class NodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Node
        fields = ('id', 'Name',)




