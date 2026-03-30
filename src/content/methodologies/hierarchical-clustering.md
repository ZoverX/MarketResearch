---
title: Hierarchical clustering
description: Build a nested clustering tree to explore how cases group together before selecting a solution.
section: Advanced Methodologies
order: 4
tags: [Segmentation, Clustering]
related: [segmentation, k-means]
chooserStage: [Discovery, Strategy]
chooserGoal: [Audience design, Structure exploration]
chooserData: [Distance matrix, Standardized numeric data]
chooserOutput: [Dendrogram, Cluster candidates]
whatItIs: Hierarchical clustering progressively merges or splits observations to reveal a nested grouping structure often visualized with a dendrogram.
whenToUse: [When you want to explore clustering structure before fixing a final solution, When a dendrogram helps explain grouping logic, When cluster count is still uncertain]
whenNotToUse: [When the sample is very large and speed matters, When you need a quick production-ready assignment method]
inputsRequired: [Standardized variables or a valid distance matrix, A linkage choice]
typicalOutputs: [Dendrogram, Candidate cluster solutions]
simpleExample: Examine how respondents cluster on attitude statements to decide whether a three four or five cluster solution is more defensible.
strengths: [Exploratory and visually intuitive, Helpful for judging cluster count]
limitations: [Can be computationally heavier, Sensitive to distance and linkage choices]
commonMistakes: [Treating one dendrogram cut as obviously correct, Ignoring the effect of preprocessing and linkage selection]
practicalUse: I use hierarchical clustering when the team still needs to understand the structure of the data before locking a final segmentation solution.
outputted: [Dendrogram and candidate cluster cuts]
interpretation: [Look for stable interpretable branches rather than forced symmetry]
clientCommunication: [Explain what the dendrogram shows and what it does not prove]
displayrNotes: [Preserve the distance and linkage settings in the project notes]
demoType: placeholder
demoTitle: Dendrogram placeholder
demoSummary: Add a screenshot of a dendrogram and annotate where a plausible cut might happen.
---

## Useful role

This method is often best used to understand the structure of the problem before a final operational clustering step.
