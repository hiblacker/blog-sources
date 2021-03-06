## Content

假设你正在用 D3 画一个 **散点图** ，并且需要创建一些 SVG circle 元素来可视化你的数据。你会惊讶的发现：D3 居然没有直接创建多个 DOM 元素的方法！等一下，这是怎么回事？

当然，D3 有 `append` 方法，你可以用来创建单个元素。比如：

```javascript
svg.append("circle").attr("cx", d.x).attr("cy", d.y).attr("r", 2.5);
```

但这只是一个圆，如果你想要创建很多个圆(每一个圆代表一个数据点)，你可能会想到用一个 `for` 循环来实现，这是非常直观的想法，这个想法并没有什么错，但是在这之前不妨看看 D3 中是如何实现创建多个元素的：

```javascript
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    })
    .attr("r", 2.5);
```

上面这段代码完美的实现了你想要的效果：为每一个数据点创建了一个 circle，用数据点的 `x` 和 `y` 属性作为 circle 的坐标. 但这段代码里面的 `selectAll("circle")` 是什么意思？我们为什么要 `select` 我们知道当前并不存在的 `circle`，还用这个方法的返回值去创建新的元素？

这段代码的思想是：**不要告诉 D3 如何去做， 而是告诉 D3 你想要什么**。 你想要 `circle` 元素和数据一一对应， 那么你就不应该告诉 D3 去创建 `circle` 元素， 而是告诉 D3：`.selectAll("circle")` 得到的 `circle` 集合应该和 `.data(data)` 一一对应。这个思想就叫做 **_Join_**。

<svg width="720" height="240">
  <g transform="translate(0,128)">
    <g transform="translate(300)">
      <circle r="110" style="fill: rgb(49, 130, 189);"></circle>
      <text y="-120" dy=".35em" text-anchor="middle" style="font-weight: bold;">Data</text>
      <text x="-50" dy=".35em" text-anchor="middle">Enter</text>
    </g>
    <text x="360" dy=".35em" text-anchor="middle">Update</text>
    <g transform="translate(420)">
      <circle r="110" style="fill: rgb(230, 85, 13);"></circle>
      <text y="-120" dy=".35em" text-anchor="middle" style="font-weight: bold;">Elements</text>
      <text x="50" dy=".35em" text-anchor="middle">Exit</text>
    </g>
  </g>
</svg>

从上图中可以看到:

-   `数据集合` 和 `DOM元素集合` 相交产生了中间的 `update` 集合
-   没有 DOM 元素与之对应的 Data 产生了左边的 `enter` 集合 (也就是缺失 DOM 元素)
-   同样的，所有没有数据与之对应的 DOM 元素产生了右边的 `exit` 集合 (也就意味着这些 DOM 元素将被移除)

现在我们可以再来看看上面那段使用 `enter-append` 模型的代码了:

1. 首先，`svg.selectAll("circle")` 返回的是一个空的集合， 因为当前 svg 容器还是空的. 这里的 svg 是所有后续创建的 circle 元素的父节点。
2. `svg.selectAll("circle")` 返回的集合接下来和 `data` 进行 **_Join_** 操作，得到的就是我们上面提到的三个集合：`update` 集合 、`enter` 集合 、`exit` 集合。因为初始时 `Elements` 集合(也就是 `circle` 集合)是空的，所以 `update` 和 `exit` 集合为空，而 `enter` 集合会自动为每一个新的 `data` 元素生成一个占位符。
3. 默认 `.data(data)` 返回的是 `update` 集合，因为 `update` 集合为空，所以我们不对其进行操作，这里我们调用 `.enter()` 得到 `enter` 集合。
4. 接下来，对于 `enter` 集合中的每一个元素，我们使用 `selection.append('circle')` (值得注意的是，对集合的操作会被应用到集合中的每一个元素上去)。这样就为每一个数据点创建了一个 `circle` (这些 `circle` 都在他们的父节点 `svg` 中)

用 **_Join_** 的方式来思考意味着，我们要做的事情仅仅是声明 DOM 集合（比如这里的 `circle` 集合）和数据集合之间的关系， 并且通过处理三个不同状态的集合 _enter_，_update_ ，_exit_ 来描述这种关系。

你也许会问，为什么要用这种方式来进行我的数据可视化工作呢？好处在哪？为什么我不直接用 for 循环创建所有我想要的元素？答案是这个思想确实是非常有好处的，它的优美之处在于它的概括性。现在我们的代码还只是处理了 `enter` 的部分，这部分对于展示静态的数据已经足够了，但如果你想进行动态的数据展示，这种 **_Join_** 的方式将大大简化你的工作，你只需要对 `update` 和 `exit` 进行很少的操作就能得到你想要的效果。这也意味着你可以轻松的展示实时数据，能够为用户添加动态的交互，能平滑的切换不同的展示数据集。

下面这段代码展示了对于 `exit` 和 `update` 集合的处理:

```javascript
var circle = svg.selectAll("circle").data(data);

circle.exit().remove();

circle
    .enter()
    .append("circle")
    .attr("r", 2.5)
    .merge(circle)
    .attr("cx", function (d) {
        return d.x;
    })
    .attr("cy", function (d) {
        return d.y;
    });
```

无论什么时候上面的这段代码被执行，它都将重新计算 **_Join_** 并且维护好 DOM **元素集合** 和 **数据集合** 之间的对应关系。如果你的新数据集比之前老的数据集要小，多余的 DOM 元素就会进入 `exit` 集合，然后被 remove 掉。如果新的数据集比老的大，那么新的数据就将进入 `enter` 集合，并创建出新的 DOM 元素。如果新的数据集和老的数目相同，那么只有 `update` 集合会被更新坐标。

使用 **_Join_** 的思想能让我们的代码更加直观。你只需要处理好这三种状态的集合，而不需要 `if` 和 `for` 来进行复杂的逻辑判断。你只需要描述好你的数据集合和 DOM 集合想要有怎样的对应关系。

**_Join_** 还让你可以对不同状态的 DOM 元素进行不同的操作。比如，你可以只对 `enter` 集合进行操作，这样就不会每次都对所有的 DOM 元素进行更新，这能显著的提升你的数据可视化作品的渲染效率。
同样的，你也可以给指定集合的元素添加动画效果，比如给 `enter` 的元素添加放大进入的效果:

```javascript
circle.enter().append("circle").attr("r", 0).transition().attr("r", 2.5);
```

或者给 `exit` 的集合添加 缩小隐藏 的效果:

```javascript
circle.exit().transition().attr("r", 0).remove();
```

## 译者注:

这里有一个非常好的实践 **_Join_** 思想的例子:

[Mike Bostock 的实现](https://bl.ocks.org/mbostock/3808234)

![join](https://cdn.superwen.cn/halo/5af96cf4ee5915caffa3594924c6aae6.gif)

### 这里是我对这个例子的实现(也包括一些其他的案例):

-   [在线演示](https://ssthouse.github.io/d3-practice/#/root)
-   [源代码](https://github.com/ssthouse/d3-practice)

原文链接: 来自 D3 作者 Mike Bostock https://bost.ocks.org/mike/join/
