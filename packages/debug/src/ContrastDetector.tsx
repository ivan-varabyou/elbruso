'use client';

import React, { useEffect, useState } from 'react';

interface ContrastIssue {
  element: HTMLElement;
  target: string;
  message: string;
  idePath: string;
}

interface ContrastDetectorProps {
  enabled: boolean;
  threshold: number;
}

export function useContrastDetector({ enabled, threshold }: ContrastDetectorProps) {
  const [issues, setIssues] = useState<ContrastIssue[]>([]);
  const [axe, setAxe] = useState<any>(null);

  // Load axe-core dynamically
  useEffect(() => {
    if (!enabled) return;

    const loadAxe = async () => {
      try {
        const axeModule = await import('axe-core');
        setAxe(axeModule.default || axeModule);
      } catch (error) {
        console.error('Failed to load axe-core:', error);
      }
    };

    loadAxe();
  }, [enabled]);

  // Scan for contrast issues using axe-core
  useEffect(() => {
    if (!enabled || !axe) {
      // Clear all highlights when disabled
      document.querySelectorAll('[data-contrast-highlight]').forEach(el => {
        const element = el as HTMLElement;
        element.style.outline = '';
        element.style.outlineOffset = '';
        element.removeAttribute('data-contrast-highlight');
        element.removeAttribute('data-a11y-issue');
        element.removeAttribute('title');
      });
      setIssues([]);
      return;
    }

    let checkTimeout: NodeJS.Timeout;

    const runContrastCheck = () => {
      clearTimeout(checkTimeout);
      checkTimeout = setTimeout(() => {
        // Clear previous highlights
        document.querySelectorAll('[data-contrast-highlight]').forEach(el => {
          const element = el as HTMLElement;
          element.style.outline = '';
          element.style.outlineOffset = '';
          element.removeAttribute('data-contrast-highlight');
          element.removeAttribute('data-a11y-issue');
          element.removeAttribute('title');
        });

        axe.run({
          rules: {
            'color-contrast': { enabled: true }
          }
        }).then((results: any) => {
          const foundIssues: ContrastIssue[] = [];

          if (results.violations.length > 0) {
            results.violations.forEach((violation: any) => {
              violation.nodes.forEach((node: any) => {
                const el = document.querySelector(node.target[0]) as HTMLElement;
                if (el) {
                  // Skip debug elements
                  if (el.classList.contains('debug-console') || 
                      el.classList.contains('debug-overlay') ||
                      el.closest('.debug-console') ||
                      el.closest('.debug-overlay')) {
                    return;
                  }

                  // Get IDE path from data-ide attribute
                  const idePath = el.getAttribute('data-ide') || node.target[0];

                  foundIssues.push({
                    element: el,
                    target: node.target[0],
                    message: violation.help,
                    idePath
                  });
                }
              });
            });
          }

          setIssues(foundIssues);
        }).catch((error: any) => {
          console.error('Axe contrast check failed:', error);
        });
      }, 500);
    };

    runContrastCheck();

    // Monitor DOM changes
    const observer = new MutationObserver((mutations) => {
      const hasSignificantChanges = mutations.some(mutation => 
        mutation.addedNodes.length > 0 || 
        mutation.removedNodes.length > 0 ||
        (mutation.type === 'attributes' && mutation.attributeName === 'class')
      );

      if (hasSignificantChanges) {
        runContrastCheck();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'style']
    });

    return () => {
      clearTimeout(checkTimeout);
      observer.disconnect();
    };
  }, [enabled, threshold, axe]);

  // Apply highlights
  useEffect(() => {
    if (!enabled || issues.length === 0) {
      return;
    }

    issues.forEach(({ element, message, idePath }) => {
      element.style.outline = '3px dashed red';
      element.style.outlineOffset = '2px';
      element.setAttribute('data-contrast-highlight', 'true');
      element.setAttribute('data-a11y-issue', 'color-contrast');
      element.setAttribute('data-ide', idePath);
      element.setAttribute('title', `Low contrast: ${message} | ${idePath}`);
    });

    return () => {
      issues.forEach(({ element }) => {
        element.style.outline = '';
        element.style.outlineOffset = '';
        element.removeAttribute('data-contrast-highlight');
        element.removeAttribute('data-a11y-issue');
        element.removeAttribute('title');
      });
    };
  }, [enabled, issues]);

  return { 
    issuesCount: issues.length,
    getIssuesList: () => issues.map(issue => ({
      path: issue.idePath,
      target: issue.target,
      message: issue.message
    }))
  };
}
