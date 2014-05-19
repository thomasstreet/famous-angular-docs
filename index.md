---
title: Famo.us / Angular
layout: home
---


{% contentfor declarativeui %}
{% highlight bash linenos %}

<fa-grid-layout fa-options="options.grid" >
  <fa-surface fa-size="[40, 40]" class="square" ng-repeat="square in squares">
  </fa-surface>
</fa-grid-layout>

{% endhighlight %}
{% endcontentfor %}




{% contentfor animations %}
{% highlight bash linenos %}

<div ng-controller="homepageExamplesCtrl">
  <fa-modifier ng-repeat="square in squares" class="rotateMod" fa-translate="[square.x, 50, 2]" fa-origin="[.125, .125]">
    <fa-surface class="square"  fa-size="[40, 40]"></fa-surface>
  </fa-modifier>
  <fa-animation autoplay="true" duration="1200" loop="true">
    <animate  targetModSelector=".rotateMod"
              field="rotateZ"
              startValue="0"
              endValue="6.283"
              curve="linear" ></animate>
  </fa-animation>
</div>

{% endhighlight %}
{% endcontentfor %}




{% contentfor code1 %}
{% highlight bash linenos %}

<fa-modifier fa-translate="[square.x, 40]" ng-repeat='square in squares'>
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>

{% endhighlight %}
{% endcontentfor %}



{% contentfor code2 %}
{% highlight bash linenos %}

<fa-surface>
  <input type="range" ng-model="translateX">
</fa-surface>

<fa-modifier fa-translate="[translateX, 0]">
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>

{% endhighlight %}
{% endcontentfor %}
