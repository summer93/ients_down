from pdm.models import *
from rest_framework import serializers


class DrawingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drawing
        fields = ('id', 'Name', 'DocNO')


class PartSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Part
        fields = ('id', 'Name', 'ItemNO', 'DocNO', 'Rev',)

