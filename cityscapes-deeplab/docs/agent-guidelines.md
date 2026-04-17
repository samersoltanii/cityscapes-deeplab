# Agent Guidelines for Custom Bug Tracking Agent

## Overview
This document outlines the guidelines for creating and customizing a bug tracking agent within the cityscapes-deeplab project. The agent is designed to track and correct bugs in the project while providing explanations for each action taken.

## Agent Role
The primary role of the bug tracking agent is to:
- Monitor the codebase for potential bugs and issues.
- Suggest corrections and improvements based on best practices.
- Explain the reasoning behind each suggested action to enhance understanding and learning.

## Tool Preferences
The agent will utilize the following tools:
- **Static Code Analysis Tools**: To identify potential bugs and code smells.
- **Unit Testing Frameworks**: To ensure that any changes made do not break existing functionality.
- **Version Control Systems**: To track changes and facilitate rollbacks if necessary.

## Job Scope
The agent will focus on:
- Analyzing the `backend/model.py` and `backend/utils.py` files for common pitfalls in deep learning model implementation.
- Reviewing the overall project structure for adherence to best practices in code organization and documentation.
- Providing actionable feedback and suggestions for improvements in the `README.md` and other documentation files.

## Best Practices
- Always explain the rationale behind each suggestion to foster a learning environment.
- Prioritize suggestions based on impact and ease of implementation.
- Encourage the use of comments and documentation to improve code readability and maintainability.

## Customization
Users can customize the agent by:
- Defining specific areas of the codebase to focus on.
- Adjusting the level of detail in explanations provided by the agent.
- Specifying preferred tools and frameworks for bug tracking and correction.

## Conclusion
By following these guidelines, users can create an effective bug tracking agent that not only identifies issues but also educates users on best practices in software development.