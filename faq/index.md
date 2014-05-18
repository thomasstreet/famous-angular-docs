---
title: Famo.us / Angular
layout: faq
---

{% contentfor basics-q1 %}
Why should Angular developers use Famo.us?
{% endcontentfor %}

{% contentfor basics-a1 %}
If you want to tap into Famo.us’s cross-platform rendering power inside a new or existing Angular app, or if you’d like to approach Famo.us with a familiar approach and workflow (i.e. with AngularJS,) then Famo.us/Angular is a great choice.
{% endcontentfor %}



{% contentfor basics-q2 %}
Why should Famo.us developers use Angular?
{% endcontentfor %}

{% contentfor basics-a2 %}
<ol>
  <li>
    You can direct and visualize your Famo.us app declaratively (in HTML)
  </li>
  <li>
    You can use Angular structural components (like reusable custom directives and general MVC patterns) to create Famo.us apps
  </li>
  <li>
    You can integrate with existing Angular components, both third party and in the Angular core.
  </li>
{% endcontentfor %}



{% contentfor basics-q3 %}
How do animations work in F/A?
{% endcontentfor %}

{% contentfor basics-a3 %}
There are two primary ways to perform animations in F/A: declaratively and imperatively.

<ol>
  <li>
    The declarative way uses a timeline model, allowing you to declare how several different attributes over several different elements should respond to a single timeline.
  </li>
  <li>
    The imperative way uses Famo.us Transitionable objects, allowing you to specify animations in a more vanilla-Famo.us way.
  </li>
</ol>

More information is available in the docs, and there will be more detail on these two approaches in the Famo.us/Angular Famo.us University course.
{% endcontentfor %}



{% contentfor basics-q4 %}
Why should Angular developers use Famo.us?
{% endcontentfor %}

{% contentfor basics-a4 %}
If you want to tap into Famo.us’s cross-platform rendering power inside a new or existing Angular app, or if you’d like to approach Famo.us with a familiar approach and workflow (i.e. with AngularJS,) then Famo.us/Angular is a great choice.

{% highlight bash linenos %}
<fa-modifier fa-translate="[square.x, 40]" ng-repeat='square in squares'>
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>
{% endhighlight %}
{% endcontentfor %}



