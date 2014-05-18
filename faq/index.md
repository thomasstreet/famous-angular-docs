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
Can I integrate F/A with an existing AngularJS app?
{% endcontentfor %}

{% contentfor basics-a4 %}
Yes, and it’s very simple. The best way for now is to install Famo.us/Angular using bower, i.e. bower install famous-angular. Then add “famous.angular” as a module in your Angular app (in the app bootstrap step, just like you’d add any other Angular module). Afterwards, you are ready to start writing F/A directives.
{% endcontentfor %}



{% contentfor basics-q5 %}
Do Angular directives like ng-repeat and ng-if work with F/A directives?
{% endcontentfor %}

{% contentfor basics-a5 %}
Yes! Since F/A works with-the-grain for both Angular and Famo.us, you can use standard Angular directives like ng-repeat, ng-include, etc. You can also use custom Angular directives (<my-custom-directive>) when creating your app.
{% endcontentfor %}



{% contentfor basics-q6 %}
Can I use existing (vanilla) Famo.us components in F/A?
{% endcontentfor %}

{% contentfor basics-a6 %}
Yes. Right now the easiest way is to use the fa-render-node directive, which allows you to pass a reference to an arbitrary render node from your controller. You can use requirejs to import your vanilla Famo.us component and instantiate it in your Angular controller. Afterwards, pass it by name to a <fa-render-node> element in the HTML.
{% endcontentfor %}



{% contentfor basics-q7 %}
Is an F/A app slower than a plain Famo.us app?
{% endcontentfor %}

{% contentfor basics-a7 %}
As with any AngularJS app (or any software, really,) it’s possible to “shoot yourself in the foot.” That said, F/A has been carefully designed to decouple Angular and its digest cycle from Famo.us’s render cycle—all rendering is handled by Famo.us itself, and the entire F/A DOM that you author is actually hidden from screen. There are a couple of ways to consider optimizing your code, for example, prefer passing references of functions directly to modifiers instead of evaluating them in code [myFunc instead of myFunc()]—more explanation in the fa-modifier documentation. In general, Angular changes will only cause Famo.us repaints if rendered content actually changes, so in short, “no,” a F/A app it’s not practically slower than a plain Famo.us app.
{% endcontentfor %}



{% contentfor instruct-q1 %}
Do I put fa-app on my <html> or <body>, like ng-app?
{% endcontentfor %}

{% contentfor instruct-a1 %}
Just like ng-app, you can put the fa-app attribute on any HTML element (though only display: block container/host elements are supported, for now.)  This is you’re entry point to F/A:  the contents of that fa-app element will be compiled as Famo.us/Angular.  Remember that any HTML content that’s not inside a <fa-surface> will be hidden from the screen.
{% endcontentfor %}



{% contentfor instruct-q2 %}
How do I use the Famo.us’s built-in views and layouts?
{% endcontentfor %}

{% contentfor instruct-a2 %}
Core Famo.us components are supported by custom directives that wrap them, exposing their api through HTML attributes.

For example, you can create a Famo.us modifier with an <code>&lt;fa-modifier&gt;</code> tag, and pass a translate value as: <div class="inline">{% highlight html %}<fa-modifier fa-translate=”[50,150,2]”>{% endhighlight %}</div>

Similarly, a <fa-scroll-view> can be instantiated with attribute options (details in docs), and you simply add children to it by making them contents of the <fa-scroll-view> HTML tag.
{% endcontentfor %}



{% contentfor instruct-q3 %}
How do animations work in F/A?
{% endcontentfor %}

{% contentfor instruct-a3 %}
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



{% contentfor instruct-q4 %}
Can I integrate F/A with an existing AngularJS app?
{% endcontentfor %}

{% contentfor instruct-a4 %}
Yes, and it’s very simple. The best way for now is to install Famo.us/Angular using bower, i.e. bower install famous-angular. Then add “famous.angular” as a module in your Angular app (in the app bootstrap step, just like you’d add any other Angular module). Afterwards, you are ready to start writing F/A directives.
{% endcontentfor %}



{% contentfor instruct-q5 %}
Do Angular directives like ng-repeat and ng-if work with F/A directives?
{% endcontentfor %}

{% contentfor instruct-a5 %}
Yes! Since F/A works with-the-grain for both Angular and Famo.us, you can use standard Angular directives like ng-repeat, ng-include, etc. You can also use custom Angular directives (<my-custom-directive>) when creating your app.
{% endcontentfor %}



{% contentfor instruct-q6 %}
Can I use existing (vanilla) Famo.us components in F/A?
{% endcontentfor %}

{% contentfor instruct-a6 %}
Yes. Right now the easiest way is to use the fa-render-node directive, which allows you to pass a reference to an arbitrary render node from your controller. You can use requirejs to import your vanilla Famo.us component and instantiate it in your Angular controller. Afterwards, pass it by name to a <fa-render-node> element in the HTML.
{% endcontentfor %}



{% contentfor instruct-q7 %}
Is an F/A app slower than a plain Famo.us app?
{% endcontentfor %}

{% contentfor instruct-a7 %}
As with any AngularJS app (or any software, really,) it’s possible to “shoot yourself in the foot.” That said, F/A has been carefully designed to decouple Angular and its digest cycle from Famo.us’s render cycle—all rendering is handled by Famo.us itself, and the entire F/A DOM that you author is actually hidden from screen. There are a couple of ways to consider optimizing your code, for example, prefer passing references of functions directly to modifiers instead of evaluating them in code [myFunc instead of myFunc()]—more explanation in the fa-modifier documentation. In general, Angular changes will only cause Famo.us repaints if rendered content actually changes, so in short, “no,” a F/A app it’s not practically slower than a plain Famo.us app.
{% endcontentfor %}



{% highlight bash linenos %}
<fa-modifier fa-translate="[square.x, 40]" ng-repeat='square in squares'>
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>
{% endhighlight %}
