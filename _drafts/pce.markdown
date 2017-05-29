---
layout: raw
title: "Polynomial Chaos Expansion - A Primer"
date: 2017-02-02
---

<h1> Polynomial Chaos Expansion - A Primer </h1>

<br>

***Abstract.** Polynomial Chaos Expansion (PCE) is a method to represent a 
random variable as a polynomial expansion of another random
variable with a given distribution.*

Consider, as a basic introductory example, a gaussian random variable $$\xi$$ with mean $$\mu = 10$$ and
variance $$\sigma^2 = 2$$, concisely written as $$\xi \sim N(\mu, \sigma^2)$$. We now want to 
represent this random variable in terms of the standard gaussian variable $$\Xi \sim N(0,1).$$

----------
<h2> Contents </h2>
* TOC
{:toc}
----------
<br> 
<br>

# §0. Disclaimer
This tutorial was written primarily as a companion to my master thesis at the 
[Advanced Control Group](https://www.iai.kit.edu/english/IAI-Workinggroup_1019.php) (Institute for Applied Computer Science @ Karlsruhe Institute of Technology).
While I worked my way into PCE, I had many aha-moments. Those are documented here along with some 
notation and derivations, such that this primer is self-contained.

Intuition will be favoured against rigour.


# §1. Preliminaries

## §1.1 Probability Theory

A random variable is, contrary to its name, a well-behaved function

$$ X : \Omega \rightarrow \mathbb{R} $$

# §2. Orthogonal Projection

## §2.1. ... onto Vectors


{: .center}
![jpg](/assets/pce/vector_projection.jpg)

**Figure 1** Projection of vector

Vector $$x$$ is projected onto vector $$B$$ (for *basis*).
The projected vector $$x_B$$ can be written as *coefficient times basis B*

$$x_B = c \cdot B$$ 

The coefficient $$c$$ is defined as follows:

$$ c = \frac{ \langle x,B \rangle}{\langle B,B \rangle^{\frac{1}{2}}}$$


## §2.2. ... onto a Plane

## §2.3. ... onto a Polynomial Basis

Consider, for instance, the first 5 Hermite polynomials:

$$ {\mathit{He}}_0(\xi)=1\,$$

$$ {\mathit{He}}_1(\xi)=\xi\,$$

$$ {\mathit{He}}_2(\xi)i=\xi^2-1\,$$

$$ {\mathit{He}}_3(\xi)=\xi^3-3\xi\,$$

$$ {\mathit{He}}_4(\xi)=\xi^4-6\xi^2+3\,$$


Those could form a basis, which will be denoted by $$\{\phi_i\}_{i=0}^{L}$$




```
indicesMulti([2,2,2])
```


|          |$$\xi_1$$  |  $$\xi_2$$  |  $$\xi_3$$  |
$$\Phi_0$$ |  0  |  0  |  0  |
$$\Phi_1$$ |  1  |  0  |  0  |
$$\Phi_2$$ |  0  |  1  |  0  |
$$\Phi_3$$ |  0  |  0  |  1  |
$$\Phi_4$$ |  2  |  0  |  0  |
$$\Phi_5$$ |  1  |  1  |  0  |
$$\Phi_6$$ |  1  |  0  |  1  |
$$\Phi_7$$ |  0  |  2  |  0  |
$$\Phi_8$$ |  0  |  1  |  1  |
$$\Phi_9$$ |  0  |  0  |  2  |
{:.table}
**Table 1:** 

These multi-indices define a multivariate basis $$\{\Phi_k\}_{k=0}^{P}$$, where each column
$$\{\xi_i\}_{i=1}^{M}$$ stands for a random variable with its associated polynomial.

In the upper example the basis is $$3$$-variate and has $$P=10$$ elements.
For instance, the first element in the basis $$\Phi_1$$ is represented by the first row:
meaning that the first element in the basis is the product of univariate polynomials with degrees all $$0$$:

$$\phi_1^0(\xi_1) \phi_2^0(\xi_2) \phi_3^0(\xi_3) = 1$$


# §3. Galerkin Tensor Computation

$$ \langle \Phi_{i_1} \Phi_{i_2} ...  \Phi_{i_M}  \rangle  =  \prod_{k=1}^{N} \langle  \phi_k^{i_1} \phi_k^{i_2} ... \phi_k^{i_M}  \rangle $$


Consider **Table 1** again. Let's say one wants to compute the triple dot product 
$$ < \Phi_0  \Phi_4 \Phi_8 > $$. The corresponding entries are:


|          |$$\xi_1$$  |  $$\xi_2$$  |  $$\xi_3$$  |
$$\Phi_0$$ |  0  |  0  |  0  |
$$\Phi_4$$ |  2  |  0  |  0  |
$$\Phi_8$$ |  0  |  1  |  1  |
{:.table}




## §3.1. Algorithm

