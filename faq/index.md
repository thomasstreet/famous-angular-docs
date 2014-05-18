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
Yes, and it’s very simple. The best way for now is to install Famo.us/Angular using bower, i.e. <code>bower install famous-angular</code>. 

Then add <code>“famous.angular”</code> as a module in your Angular app (in the app bootstrap step, just like you’d add any other Angular module).

Afterwards, you are ready to start writing F/A directives.
{% endcontentfor %}



{% contentfor basics-q5 %}
Do Angular directives like <code>ng-repeat</code> and <code>ng-if</code> work with F/A directives?
{% endcontentfor %}

{% contentfor basics-a5 %}
Yes! Since F/A works with-the-grain for both Angular and Famo.us, you can use standard Angular directives like <code>ng-repeat</code>, <code>ng-include</code>, etc. 

You can also use custom Angular directives (<code>&lt;my-custom-directive&gt;</code>) when creating your app.
{% endcontentfor %}



{% contentfor basics-q6 %}
Can I use existing (vanilla) Famo.us components in F/A?
{% endcontentfor %}

{% contentfor basics-a6 %}
Yes. Right now the easiest way is to use the <code>fa-render-node</code> directive, which allows you to pass a reference to an arbitrary render node from your controller.

You can use requirejs to import your vanilla Famo.us component and instantiate it in your Angular controller.

Afterwards, pass it by name to a <code><fa-render-node></code> element in the HTML.{% endcontentfor %}



{% contentfor basics-q7 %}
Is an F/A app slower than a plain Famo.us app?
{% endcontentfor %}

{% contentfor basics-a7 %}
As with any AngularJS app (or any software, really,) it’s possible to “shoot yourself in the foot.”

That said, F/A has been carefully designed to decouple Angular and its digest cycle from Famo.us’s render cycle—all rendering is handled by Famo.us itself, and the entire F/A DOM that you author is actually hidden from screen.

There are a couple of ways to consider optimizing your code, for example, prefer passing references of functions directly to modifiers instead of evaluating them in code [myFunc instead of myFunc()]—more explanation in the fa-modifier documentation.

In general, Angular changes will only cause Famo.us repaints if rendered content actually changes, so in short, “no,” a F/A app it’s not practically slower than a plain Famo.us app.
{% endcontentfor %}



{% contentfor instruct-q1 %}
Do I put <code>fa-app</code> on my <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code>, like <code>ng-app</code>?
{% endcontentfor %}

{% contentfor instruct-a1 %}
Just like <code>ng-app</code>, you can put the <code>fa-app</code> attribute on any HTML element (though only display: block container/host elements are supported, for now.)

This is your entry point to F/A:  the contents of that fa-app element will be compiled as Famo.us/Angular.

Remember that any HTML content that’s not inside a <code>&lt;fa-surface&gt;</code> will be hidden from the screen.
{% endcontentfor %}



{% contentfor instruct-q2 %}
How do I use the Famo.us’s built-in views and layouts?
{% endcontentfor %}

{% contentfor instruct-a2 %}
Core Famo.us components are supported by custom directives that wrap them, exposing their api through HTML attributes.

For example, you can create a Famo.us modifier with an <code>&lt;fa-modifier&gt;</code> tag, and pass a translate value as: <code>&lt;fa-modifier fa-translate=”[50,150,2]”&gt;</code>

Similarly, a <code>&lt;fa-scroll-view&gt;</code> can be instantiated with attribute options (details in docs), and you simply add children to it by making them contents of the <fa-scroll-view> HTML tag.
{% endcontentfor %}



{% contentfor instruct-q3 %}
How does event piping work in F/A?
{% endcontentfor %}

{% contentfor instruct-a3 %}
The <code>fa-pipe-to</code> and <code>fa-pipe-from</code> directives give you a declarative interface for handling Famo.us events.

You can read more about Famo.us piping to get a better idea of how this works.

For eventing within your application (i.e. not necessarily touch events, but programmatically triggered events) you can use Angular’s <code>$emit</code>, <code>$broadcast</code>, and <code>$on</code>, as well.
{% endcontentfor %}



{% contentfor instruct-q4 %}
How do I put images (or videos, etc) inside my app?
{% endcontentfor %}

{% contentfor instruct-a4 %}
<code>&lt;fa-surface&gt;</code> is the entry point back into normal HTML, allowing any standard HTML content including images, videos, or even normal Angular directives.

For example, you can nest <code>&lt;img&gt;</code> tags inside an <code>&lt;fa-surface&gt;</code> directive:
{% highlight html %}
<fa-surface>
 <img src="images/lock-screen/capsule.svg" />
</fa-surface>
{% endhighlight %}

  Use specialized Famo.us components for different media, for example for images you can use a <code>&lt;fa-image-surface&gt;</code>, passing <code>image-url=”your/image/url”</code> as an attribute.
{% endcontentfor %}



{% contentfor instruct-q5 %}
How do I use Transitionables?
{% endcontentfor %}

{% contentfor instruct-a5 %}
Transitionables do not currently have a declarative HTML interface in F/A (use the fa-animation directive for declarative animations.) Basic Transitionables will need to be created in javascript, inside a controller.

You can instantiate Transitionables in the controller, and then bind them to the <code>$scope</code> to be used with directives:

<ul>
  <li>
    Controller
{% highlight javascript %}
var Transitionable = famous['famous/transitions/Transitionable'];
$scope.xTransitionable = new Transitionable(0);
{% endhighlight %}
  </li>
  <li>
    Template
{% highlight javascript %}
<fa-modifier fa-translate=”[xTransitionable.get,0,0]”>...</fa-modifier> 
{% endhighlight %}
   </li>
</ul>
{% endcontentfor %}




{% contentfor troubleshoot-q1 %}
Can I use existing (vanilla) Famo.us components in F/A?
{% endcontentfor %}

{% contentfor troubleshoot-a1 %}
Yes. Right now the easiest way is to use the fa-render-node directive, which allows you to pass a reference to an arbitrary render node from your controller. You can use requirejs to import your vanilla Famo.us component and instantiate it in your Angular controller. Afterwards, pass it by name to a <fa-render-node> element in the HTML.
{% endcontentfor %}



{% contentfor troubleshoot-q2 %}
Is an F/A app slower than a plain Famo.us app?
{% endcontentfor %}

{% contentfor troubleshoot-a2 %}
As with any AngularJS app (or any software, really,) it’s possible to “shoot yourself in the foot.” That said, F/A has been carefully designed to decouple Angular and its digest cycle from Famo.us’s render cycle—all rendering is handled by Famo.us itself, and the entire F/A DOM that you author is actually hidden from screen. There are a couple of ways to consider optimizing your code, for example, prefer passing references of functions directly to modifiers instead of evaluating them in code [myFunc instead of myFunc()]—more explanation in the fa-modifier documentation. In general, Angular changes will only cause Famo.us repaints if rendered content actually changes, so in short, “no,” a F/A app it’s not practically slower than a plain Famo.us app.
{% endcontentfor %}



{% highlight bash linenos %}
<fa-modifier fa-translate="[square.x, 40]" ng-repeat='square in squares'>
  <fa-surface fa-size="[40, 40]" class="square">
  </fa-surface>
</fa-modifier>
{% endhighlight %}
