import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Link, MemoryRouter, Outlet } from 'react-router-dom';
import * as TestRenderer from 'react-test-renderer';
import { HelperRouteObject } from '../types';
import { guardWaitTimeBeforeCheck, mockGuardWorkTime } from './utils/guard-utils';
import { MockAsyncGuard } from './utils/mock-async-guard';
import { MockShouldNeverBeCalledGuard } from './utils/mock-should-never-be-called-guard';
import { MockSyncGuard } from './utils/mock-sync-guard';
import { RoutesRenderer } from './utils/RoutesRenderer';
import { wait } from './utils/wait';

// const mockGuardWorkTime = 200;

describe('Guards in route', () => {
  describe('with async guards', () => {
    it('with 1 guard which return true', async () => {
      let renderer: TestRenderer.ReactTestRenderer;

      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`
        <div>
          Home
        </div>
      `);
    });
    it('with 1 guard which return false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;

      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guard which return true - first true - second false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(true, mockGuardWorkTime), new MockAsyncGuard(true, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime * 2 + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`
        <div>
          Home
        </div>
      `);
    });
    it('with 2 guard which return false - first false - second false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(false, mockGuardWorkTime), new MockAsyncGuard(false, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guard which first guard true - second false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(true, mockGuardWorkTime), new MockAsyncGuard(false, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime * 2 + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guard which first guard false - second true', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(false, mockGuardWorkTime), new MockAsyncGuard(true, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });
  });

  describe('with sync guards', () => {
    it('with 1 guard which return true', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockSyncGuard(true)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(1);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`
        <div>
          Home
        </div>
      `);
    });
    it('with 1 guard which return false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockSyncGuard(false)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(1);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guards which return true', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockSyncGuard(true), new MockSyncGuard(true)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(1);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`
        <div>
          Home
        </div>
      `);
    });
    it('with 2 guards which return false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockSyncGuard(false), new MockSyncGuard(false)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(1);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guards which first guard true - second false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockSyncGuard(true), new MockSyncGuard(false)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(1);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });

    it('with 2 guards which first guard false - second false', async () => {
      let renderer: TestRenderer.ReactTestRenderer;
      const routes: HelperRouteObject[] = [
        {
          path: '/',
          element: <div>Home</div>,
          guards: [new MockAsyncGuard(false, mockGuardWorkTime), new MockAsyncGuard(false, mockGuardWorkTime)],
        },
      ];

      TestRenderer.act(() => {
        renderer = TestRenderer.create(
          <MemoryRouter initialEntries={['/']}>
            <RoutesRenderer routes={routes} />
          </MemoryRouter>,
        );
      });

      await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

      expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);
    });
  });

  describe('next guard after failed one must not be called', () => {
    describe('sync', () => {
      it('with 2 guards', async () => {
        const counter = { amount: 0 };
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            guards: [new MockSyncGuard(false), new MockShouldNeverBeCalledGuard(counter)],
          },
        ];

        TestRenderer.act(() => {
          TestRenderer.create(
            <MemoryRouter initialEntries={['/']}>
              <RoutesRenderer routes={routes} />
            </MemoryRouter>,
          );
        });

        await wait(1);
        expect(counter.amount).toBe(0);
      });

      it('with 3 guards', async () => {
        const counter = { amount: 0 };
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            guards: [new MockSyncGuard(true), new MockSyncGuard(false), new MockShouldNeverBeCalledGuard(counter)],
          },
        ];

        TestRenderer.act(() => {
          TestRenderer.create(
            <MemoryRouter initialEntries={['/']}>
              <RoutesRenderer routes={routes} />
            </MemoryRouter>,
          );
        });

        await wait(1);
        expect(counter.amount).toBe(0);
      });
    });

    describe('async', () => {
      it('with 2 guards', async () => {
        const counter = { amount: 0 };
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            guards: [new MockAsyncGuard(false, mockGuardWorkTime), new MockShouldNeverBeCalledGuard(counter)],
          },
        ];

        TestRenderer.act(() => {
          TestRenderer.create(
            <MemoryRouter initialEntries={['/']}>
              <RoutesRenderer routes={routes} />
            </MemoryRouter>,
          );
        });

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);
        expect(counter.amount).toBe(0);
      });

      it('with 3 guards', async () => {
        const counter = { amount: 0 };
        const routes: HelperRouteObject[] = [
          {
            path: '/',
            element: <div>Home</div>,
            guards: [
              new MockAsyncGuard(true, mockGuardWorkTime),
              new MockAsyncGuard(false, mockGuardWorkTime),
              new MockShouldNeverBeCalledGuard(counter),
            ],
          },
        ];

        TestRenderer.act(() => {
          TestRenderer.create(
            <MemoryRouter initialEntries={['/']}>
              <RoutesRenderer routes={routes} />
            </MemoryRouter>,
          );
        });

        await wait(mockGuardWorkTime * 2 + guardWaitTimeBeforeCheck);
        expect(counter.amount).toBe(0);
      });
    });
  });

  describe('check guard render', () => {
    describe('path direct to the child', () => {
      describe('guard on parent only', () => {
        const testDatas = [
          {
            it: 'canActivate true',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                children: [{ path: 'child', element: <div>Child</div> }],
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `
              <div>
                Home 
                <div>
                  Child
                </div>
              </div>
            `,
          },
          {
            it: 'canActivate false',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                children: [{ path: 'child', element: <div>Child</div> }],
                guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `null`,
          },
        ];

        test.each(testDatas)('$it', renderTest);
      });

      describe('guard on child only', () => {
        const testDatas = [
          {
            it: 'canActivate true',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: <div>Child</div>,
                  },
                ],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `
              <div>
                Home 
              </div>
            `,
            expectedResult: `
              <div>
                Home 
                <div>
                  Child
                </div>
              </div>
            `,
          },
          {
            it: 'canActivate false',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
                    element: <div>Child</div>,
                  },
                ],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `
              <div>
                Home 
              </div>
            `,
            expectedResult: `
              <div>
                Home 
              </div>
              `,
          },
        ];

        test.each(testDatas)('$it', renderTest);
      });

      describe('guard on child and parent', () => {
        const testDatas = [
          {
            it: 'canActivate false',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: <div>Child</div>,
                  },
                ],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime * 2 + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `
              <div>
                Home 
                <div>
                  Child
                </div>
              </div>
            `,
          },
          {
            it: 'canActivate true with 3 children',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: (
                      <div>
                        Child
                        <Outlet />
                      </div>
                    ),
                    children: [
                      {
                        path: 'child2',
                        guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                        element: <div>Child 2</div>,
                      },
                    ],
                  },
                ],
              },
            ],
            path: '/child/child2',
            waitTimeBeforeCheck: mockGuardWorkTime * 3 + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `
              <div>
                Home 
                <div>
                  Child
                  <div>
                    Child 2
                  </div>
                </div>
              </div>
            `,
          },
          {
            it: 'canActivate true with 4 children',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: (
                      <div>
                        Child
                        <Outlet />
                      </div>
                    ),
                    children: [
                      {
                        path: 'child2',
                        guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                        element: (
                          <div>
                            Child 2
                            <Outlet />
                          </div>
                        ),
                        children: [
                          {
                            path: 'child3',
                            guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                            element: <div>Child 3</div>,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            path: '/child/child2/child3',
            waitTimeBeforeCheck: mockGuardWorkTime * 4 + guardWaitTimeBeforeCheck * 4,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `
              <div>
                Home 
                <div>
                  Child
                  <div>
                    Child 2
                    <div>
                      Child 3
                    </div>
                  </div>
                </div>
              </div>
            `,
          },
          {
            it: 'canActivate false',
            routes: [
              {
                path: '/',
                element: (
                  <div>
                    Home <Outlet />
                  </div>
                ),
                guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
                children: [
                  {
                    path: 'child',
                    guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
                    element: <div>Child</div>,
                  },
                ],
              },
            ],
            path: '/child',
            waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
            expectedResultBeforeGuardWord: `null`,
            expectedResult: `null`,
          },
        ];

        test.each(testDatas)('$it', renderTest);
      });
    });
    describe('path direct to the parent', () => {
      const testDatas = [
        {
          it: 'canActivate true',
          routes: [
            {
              path: '/',
              element: (
                <div>
                  Home <Outlet />
                </div>
              ),
              children: [
                {
                  path: 'child',
                  guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                  element: <div>Child</div>,
                },
              ],
              guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
            },
          ],
          path: '/',
          waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
          expectedResultBeforeGuardWord: `null`,
          expectedResult: `
              <div>
                Home 
              </div>
            `,
        },
        {
          it: 'canActivate true',
          routes: [
            {
              path: '/',
              element: (
                <div>
                  Home <Outlet />
                </div>
              ),
              children: [
                {
                  path: 'child',
                  guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
                  element: <div>Child</div>,
                },
              ],
              guards: [new MockAsyncGuard(false, mockGuardWorkTime)],
            },
          ],
          path: '/',
          waitTimeBeforeCheck: mockGuardWorkTime + guardWaitTimeBeforeCheck,
          expectedResultBeforeGuardWord: `null`,
          expectedResult: `null`,
        },
      ];

      test.each(testDatas)('$it', renderTest);
    });

    describe('path to the child, children should render consequentially', () => {
      it('with 4 children', async () => {
        const routes = [
          {
            path: '/',
            element: (
              <div>
                Home <Outlet />
              </div>
            ),
            guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
            children: [
              {
                path: 'child',
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                element: (
                  <div>
                    Child
                    <Outlet />
                  </div>
                ),
                children: [
                  {
                    path: 'child2',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: (
                      <div>
                        Child 2
                        <Outlet />
                      </div>
                    ),
                    children: [
                      {
                        path: 'child3',
                        guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                        element: <div>Child 3</div>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];
        let renderer: TestRenderer.ReactTestRenderer;

        TestRenderer.act(() => {
          renderer = TestRenderer.create(
            <MemoryRouter initialEntries={['/child/child2/child3']}>
              <RoutesRenderer routes={routes} location={{ pathname: '/child/child2/child3' }} />
            </MemoryRouter>,
          );
        });

        await wait(1);

        expect(renderer.toJSON()).toMatchInlineSnapshot(`null`);

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
          <div>
            Home 
          </div>
        `);

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
          <div>
            Home 
            <div>
              Child
            </div>
          </div>
         `);

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
              <div>
                Home 
                <div>
                  Child
                  <div>
                    Child 2
                  </div>
                </div>
              </div>
         `);

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        expect(renderer.toJSON()).toMatchInlineSnapshot(`
          <div>
            Home 
            <div>
              Child
              <div>
                Child 2
                <div>
                  Child 3
                </div>
              </div>
            </div>
          </div>
         `);
      });
    });

    describe('with dynamic path', () => {
      let node: HTMLDivElement;
      beforeEach(() => {
        node = document.createElement('div');
        document.body.appendChild(node);
      });

      afterEach(() => {
        document.body.removeChild(node);
        node = null!;
      });

      it('with 3 children, check guards to be correctly rendered and should not be rendered twice for parents', async () => {
        const FirstLink = () => (
          <Link to="/child" id="child-link">
            Child
          </Link>
        );

        const SecondLink = () => (
          <Link to="/child2" id="child-link2">
            Child2
          </Link>
        );
        const ThirdLink = () => (
          <Link to="/child3" id="child-link3">
            Child3
          </Link>
        );

        const routes = [
          {
            path: '/',
            guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
            element: (
              <div>
                Home test
                <FirstLink />
                <div id="first-child-container">
                  <Outlet />
                </div>
              </div>
            ),
            children: [
              {
                path: 'child',
                guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                element: (
                  <div>
                    Child
                    <SecondLink />
                    <Outlet />
                  </div>
                ),
                children: [
                  {
                    path: 'child2',
                    guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                    element: (
                      <div>
                        Child 2
                        <ThirdLink />
                        <Outlet />
                      </div>
                    ),
                    children: [
                      {
                        path: 'child3',
                        guards: [new MockAsyncGuard(true, mockGuardWorkTime)],
                        element: <div>Child 3</div>,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];

        act(() => {
          ReactDOM.render(
            <MemoryRouter initialEntries={['/']}>
              <RoutesRenderer routes={routes} location={{ pathname: '/' }} />
            </MemoryRouter>,
            node,
          );
        });

        await wait(1);

        // Elements should not be rendered immediately after initialization, since the first parent has guard
        let firstChildContainer = node.querySelector('#first-child-container');
        expect(firstChildContainer).toBeNull();

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        // As soon as guard has first parent guard has finished his work, we should be able to see the content,
        // but not the children, because they have guards as well
        firstChildContainer = node.querySelector('#first-child-container');
        expect(firstChildContainer).not.toBeNull();
        expect(firstChildContainer!.children.length).toBe(0);

        const firstChildLink = node.querySelector('#child-link');
        expect(firstChildLink).not.toBeNull();

        act(() => {
          firstChildLink!.dispatchEvent(new Event('click', { bubbles: true, cancelable: true }));
        });
        await wait(1);

        // Just after click we still shouldn't be able to see child content, since it has async guard
        firstChildContainer = node.querySelector('#first-child-container');
        expect(firstChildContainer!.children.length).toBe(0);

        // expect(firstChildContainer!.children.length).toBe(0);
        // const childLink = renderer.root.findByType(FirstLink);
        // expect(childLink).not.toBeNull();

        await wait(mockGuardWorkTime + guardWaitTimeBeforeCheck);

        // Just after first child guard work we should be able to see the child content
        firstChildContainer = node.querySelector('#first-child-container');
        expect(firstChildContainer!.children.length).toBe(1);

        // expect(renderer.toJSON()).toMatchInlineSnapshot(`
        //   <div>
        //     Home
        //   </div>
        // `);
      });
    });
  });
});

async function renderTest({ routes, path, waitTimeBeforeCheck, expectedResult, expectedResultBeforeGuardWord }) {
  let renderer: TestRenderer.ReactTestRenderer;

  TestRenderer.act(() => {
    renderer = TestRenderer.create(
      <MemoryRouter initialEntries={[path]}>
        <RoutesRenderer routes={routes} location={{ pathname: path }} />
      </MemoryRouter>,
    );
  });

  await wait(1);

  expect(renderer.toJSON()).toMatchInlineSnapshot(expectedResultBeforeGuardWord);

  await wait(waitTimeBeforeCheck);

  expect(renderer.toJSON()).toMatchInlineSnapshot(expectedResult);
}

function click(anchor: HTMLAnchorElement, eventInit?: MouseEventInit) {
  const event = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
    ...eventInit,
  });
  anchor.dispatchEvent(event);
  return event;
}
