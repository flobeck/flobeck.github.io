---
layout: neuralgasclock
title:  "Neural Gas Clock"
date:   2014-09-22 21:10:55
---

*Neural gases* are artificial neural networks for vector quantization. They can learn probability distributions or topologies in general. They were first introduced in 1991 by Thomas Martinez and Klaus Schulten, who are researchers in the field of neuroinformatics.
Fast convergence (especially when you are learning a non-static probability distribution as it is the case here) is crucial for applications of vector quantization. As you can see, readability of seconds is an issue. This -of course- can be improved.

The neural gas algorithm is detailed in the original paper[^1]. In this post, I want to give a short explanation based on this clock.

The (Euclidean) topologies which are learned in this case are digits, as displayed by digital clocks using a seven-segment LED display. In my code those segments are implemented as simple lines.
Every digit is made up of $$N$$ 2-dimensional ***codebook vectors*** $$w_1, w_2, ... ,w_N$$. These vectors are visualized as the little dots you can see whirling around in the above clock.
Here, the codebook vectors are initialized deterministically ([Halton sequence](http://en.wikipedia.org/wiki/Halton_sequence)). Then, a data vector $$x$$ (i.e. a point situated on one of the line segments of the digit) is chosen randomly. In the following, every single one of the $$N$$ codebook vectors is adapted to $$x$$.

So, how does this adaptation process work exactly?

After a random point $$x$$ located on a digit is chosen, the distance to $$x$$ is determined for all codebook vectors $$w_1, w_2, ... w_N$$. Next, they are sorted accordingly in ascending order, such that for $$k=0 \; w_{i_k}$$ is the codebook vector nearest to $$x$$. For $$k=0,...,N-1$$ adaptation is (cf. [^1]):

$$\vec{w_i} \longleftarrow \vec{w_i} + \epsilon(t)e^{\frac{-k}{\lambda(t)}}(\vec{w_i^tx^t})$$

where $$t$$ increases nonlinearly.

The new position of a "particle" (codebook vector) is computed by adding its old position to a vector pointing from the old position to the data vector $$x$$ weighted by some time-dependent factors (i.e. functions). In detail:

$$
\underbrace{\vec{w_i}}_{\text{new codebook vector}} \longleftarrow \underbrace{\vec{w_i}}_{\text{old codebook vector}} + \underbrace{\epsilon(t)}_{\text{learning rate}} e^{\frac{-k}{\underbrace{\lambda(t)}_{*}}}\underbrace{\vec{w_i^tx^t}}_{\substack{\text{vector from codebook} \\\ \text{vector to data vector}}}
$$

$$*$$ neighbourhood range

<br> <br> <br>

$$\epsilon(t)$$ and $$\lambda(t)$$ decay over time:


{% highlight java %}
// using processing(js)

class CodebookVector {
  final float t_max = 500.0;

  PVector w;
  int i;         // index/order (-> e.g. euclidian norm)
  float t = 1.0;
  float time = 1.0;
  float neighbourhood = 8.0;

  public CodebookVector(float posx, float posy, int i) {
    this.i = i;
    this.w = new PVector(posx, posy);
  }

  void changeOrder(int i) {
    this.i = i;
  }

  void resetTime() {
    this.t = 1;
    this.time = 1;
  }

  float eta(float t) {
    return 1-1*(t/t_max);
  }

  float lambda(float t) {
    return neighbourhood-neighbourhood*(t/t_max);
  }

  /**
   * change the weight vector/codebook vector w in direction of input
   * @input: (x y) from prob. distribution
   **/
   void learn(float x, float y) {
    float l = eta(this.t) * exp(-this.i/lambda(this.t))
    this.w.x = this.w.x + l * (x - this.w.x);
    this.w.y = this.w.y + l * (y - this.w.y);

    this.t = t_max*(1 - exp(-0.012*(++this.time))); // t increases nonlinearly
  }

}

}

{% endhighlight java %}

(A python-version can be found [here](https://github.com/flobeck/neuralgasclock))




<br> <br> <br> <br> <br> <br> <br>

[^1]: [A 'Neural-Gas' Network Learns Topologies](http://www.ks.uiuc.edu/Publications/Papers/PDF/MART91B/MART91B.pdf)
