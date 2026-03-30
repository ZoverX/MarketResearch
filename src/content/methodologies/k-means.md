---
title: K-means
description: Partition observations into a fixed number of clusters by minimizing within-cluster variation.
section: Advanced Methodologies
order: 3
tags: [Segmentation, Clustering]
related: [segmentation, hierarchical-clustering]
chooserStage: [Strategy]
chooserGoal: [Audience design, Simplification]
chooserData: [Standardized numeric data]
chooserOutput: [Cluster assignments]
whatItIs: K-means is a clustering algorithm that allocates each case to one of K clusters based on distance to a cluster centroid.
whenToUse: [When you already have a likely range for the number of clusters, When variables are numeric and standardized, When you need a relatively efficient baseline segmentation algorithm]
whenNotToUse: [When the data has strong outliers or non-spherical structure, When the number of clusters is completely unknown, When interpretability requires a more exploratory clustering path]
inputsRequired: [Numeric standardized variables, A tested value of K, Multiple random starts or stability checks]
typicalOutputs: [Cluster assignments, Cluster centroids, Separation diagnostics]
simpleExample: Run a four-cluster solution on standardized need-state batteries to create a first segmentation candidate.
strengths: [Fast and widely understood, Useful as a practical baseline]
limitations: [Requires K in advance, Sensitive to initialization and scaling]
commonMistakes: [Using raw variables with different scales, Choosing K only because it looks neat in a presentation]
practicalUse: I use K-means as a candidate generator rather than an automatic answer. It becomes useful once combined with stability checks and strong segment profiling.
outputted: [Cluster IDs and centroids]
interpretation: [Compare centroids and sizes before naming clusters]
clientCommunication: [Position it as one way to derive a segmentation solution not the whole story]
displayrNotes: [Keep preprocessing steps documented so the solution can be reproduced]
demoType: placeholder
demoTitle: K-means output placeholder
demoSummary: Add a centroid table or cluster-profile heatmap screenshot here later.
---

## Practical note

K-means is often most useful when paired with other exploratory steps instead of treated as a one-click truth machine.
