---
layout: post
title: "Fourier Descriptors"
date: 2015-12-21
---

In pattern recognition fourier descriptors (FD) are used to extract meaningful characteristics
of a closed curve. Imagine, for instance, you have the fourier descriptors of the
contour of a maple and a chestnut leaf and you want to classify another leaf in one
of those two classes (you are living in a world with only two kinds of trees). 
This scenario can be (easily?) solved with FD, because they are tranlation, rotation and scaling 
invariant.[^1]

You take the vertices $$(x,y)$$ of some arbitrary polygon and transform 
them to complex numbers $$(x+iy)$$. The fourier descriptors are the normalized
coefficients of DFT of the $$(x+iy)$$.

By applying the inverse DFT the original contour can be retrieved.
It turns out that only a few low frequency components are enough to get a good approximation.

For every frame in this .gif an additional fourier descriptor is used.
<p align="center"><img src="/assets/fourierdescriptors/fourier.gif" alt="" style="width:500px;height:500px"></p>


[^1]: [http://fourier.eng.hmc.edu/e161/lectures/fd/node1.html](http://fourier.eng.hmc.edu/e161/lectures/fd/node1.html)

