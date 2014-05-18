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

<input type="range" ng-model="translateX">

<fa-modifier fa-translate="[translateX, 0]">
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>

{% endhighlight %}
{% endcontentfor %}



{% contentfor code3 %}
{% highlight bash linenos %}
<button ng-click="!translate">

<fa-modifier fa-translate="[50, 0]" ng-if="translate == true">
  <fa-surface fa-size="[40, 40]">
  </fa-surface>
</fa-modifier>

{% endhighlight %}
{% endcontentfor %}
