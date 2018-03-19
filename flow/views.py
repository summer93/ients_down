from django.http import HttpResponse
from django.shortcuts import render
# from flow.models import *
from flow.serializers import *

# Create your views here.
from rest_framework import viewsets


class NodeViewSet(viewsets.ModelViewSet):
    queryset = Node.objects.all()
    serializer_class = NodeSerializer


def test(request):
    return HttpResponse("OK")

