import * as React from 'react';
import { HelperOutlet } from '../route-helper';
import { HelperRouteObject } from '../types';
import { testIn3DifferentModes } from './utils/check-with-3-different-envs';
import { longestWorkDuration, mediumWorkDuration, minimalWorkDuration } from './utils/general-utils';
import { wait } from './utils/wait';
import { expect } from '@jest/globals';

describe('title in route', () => {
  describe('title field only', () => {
    describe('for parent route', () => {
      describe('should set title', () => {
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            title: 'Home - Title',
          },
        ];

        testIn3DifferentModes({
          routes,
          initialPath: '/',
          validate: async () => {
            await wait(longestWorkDuration);

            expect(global.window.document.title).toBe('Home - Title');
          },
        });
      });
    });

    describe('for nested child route', () => {
      describe('second nesting layer', () => {
        describe('should set title, parent does not have title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /></div>,
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  title: 'Child - Title',
                },
              ],
            },
          ];
          testIn3DifferentModes({
            routes,
            initialPath: '/child',
            validate: async () => {
              await wait(minimalWorkDuration);

              expect(global.window.document.title).toBe('Child - Title');
            },
          });

        });

        describe('should set title, parent has title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /></div>,
              title: 'Home - Title',
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  title: 'Child - Title',
                },
              ],
            },
          ];

          testIn3DifferentModes({
            routes,
            initialPath: '/child',
            validate: async () => {
              await wait(longestWorkDuration);

              expect(global.window.document.title).toBe('Child - Title');
            },
          });

        });

      });


      describe('third nesting layer', () => {
        describe('should set title, parent does not have title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /> </div>,
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  children: [
                    {
                      path: 'child2',
                      element: <div>Child2</div>,
                      title: 'Child2 - Title',
                    },
                  ],
                },
              ],
            },
          ];

          testIn3DifferentModes({
            routes,
            initialPath: '/child/child2',
            validate: async () => {
              await wait(longestWorkDuration);

              expect(global.window.document.title).toBe('Child2 - Title');
            },
          });
        });

        describe('should set title, parent has title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /></div>,
              title: 'Home - Title',
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  title: 'Child - Title',
                  children: [
                    {
                      path: 'child2',
                      element: <div>Child2</div>,
                      title: 'Child2 - Title',
                    },
                  ],
                },
              ],
            },
          ];

          testIn3DifferentModes({
            routes,
            initialPath: '/child/child2',
            validate: async () => {
              await wait(longestWorkDuration);

              expect(global.window.document.title).toBe('Child2 - Title');
            },
          });

        });
      });
    });
  });

  describe('title field should be ignored if titleResolver is passed', () => {
    describe('for parent route', () => {
      describe('should set title from resolver only', () => {
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            title: 'Home - Title',
            titleResolver: () => async () => {
              await wait(longestWorkDuration);
              return "Home - Title from resolver";
            }
          },
        ];

        testIn3DifferentModes({
          beforeEach: () => {
            global.window.document.title = "";
          },
          routes,
          initialPath: '/',
          validate: async () => {
            await wait(longestWorkDuration);

            expect(global.window.document.title).toBe('');

            await wait(longestWorkDuration + mediumWorkDuration);

            expect(global.window.document.title).toBe('Home - Title from resolver');
          },
        });
      });

      describe('second nesting layer', () => {
        describe('should set title, parent does not have title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /></div>,
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  title: 'Child - Title',
                  titleResolver: () => async () => {
                    await wait(longestWorkDuration);
                    return "Child - Title from resolver";
                  }
                },
              ],
            },
          ];

          testIn3DifferentModes({
            beforeEach: () => {
              global.window.document.title = "";
            },
            routes,
            initialPath: '/child',
            validate: async () => {
              await wait(longestWorkDuration);

              expect(global.window.document.title).toBe('');
              await wait(longestWorkDuration + mediumWorkDuration);

              expect(global.window.document.title).toBe('Child - Title from resolver');
            },
          });

        });

        describe('should set title, parent has title', () => {

          const routes: HelperRouteObject[] = [
            {
              path: '/',
              element: <div>Home <HelperOutlet /></div>,
              title: 'Home - Title',
              children: [
                {
                  path: 'child',
                  element: <div>Child</div>,
                  title: 'Child - Title',
                },
              ],
            },
          ];

          testIn3DifferentModes({
            beforeEach: () => {
              global.window.document.title = "";
            },
            routes,
            initialPath: '/child',
            validate: async () => {
              await wait(longestWorkDuration);

              expect(global.window.document.title).toBe('Child - Title');
            },
          });

        });

      });
    });
  });
  describe('titleResolver only', () => {
    // TODO: Add tests
  });
  describe('mixed', () => {
    // TODO: Add tests
  });


  describe('title must be applied before workers', () => {
    // TODO: Add tests
  });
  describe('titleResolver must be applied after workers', () => {
    // TODO: Add tests
  });

  describe('parent route does not have Outlet child title should not be set', () => {
    describe('second nesting route', () => {
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: (
            <div>
              Home
            </div>
          ),
          title: "Home - Title",
          children: [
            {
              path: 'child',
              element: <div>Child</div>,
              title: "Child - Title"
            },
          ],
        },
      ];

      testIn3DifferentModes({
        beforeEach: () => {
          window.document.title = "";
        },
        routes,
        initialPath: '/child',
        validate: async () => {
          await wait(longestWorkDuration);

          expect(global.window.document.title).toBe('');
        },
      });
    });
    describe('third nesting route', () => {

      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: (
            <div>
              Home
            </div>
          ),
          title: "Home - Title",
          children: [
            {
              path: 'child',
              element: <div>Child</div>,
              title: "Child - Title",
              children: [
                {
                  path: 'child2',
                  element: <div>Child2</div>,
                  title: "Child2 - Title",
                },
              ],
            },
          ],
        },
      ];

      testIn3DifferentModes({
        routes,
        initialPath: '/child/child2',
        validate: async () => {
          await wait(longestWorkDuration + mediumWorkDuration);

          expect(global.window.document.title).toBe('');
        },
      });

    });
  });
});



function click(anchor: HTMLAnchorElement, eventInit?: MouseEventInit) {
  let event = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
    ...eventInit,
  });
  anchor.dispatchEvent(event);
  return event;
}
