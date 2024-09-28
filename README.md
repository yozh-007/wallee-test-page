# Wallee test page

### Initial setup

To install project dependencies - run in terminal:

```bash
npm install
```


### Start development

Run in terminal:

```bash
npm run dev
```

To check ESLint linting, run in terminal:

```bash
npm run lint
```


### Create production distribution

Run in terminal:

```bash
npm run build
```


## App src folder structure

```
.
├── index.css
├── main.tsx
│
├── App.module.scss
├── App.tsx
├── CommonContext.tsx
├── types.ts
├── components
│     ├── CheckboxList
│     │     ├── CheckboxList.module.scss
│     │     └── CheckboxList.tsx
│     ├── CheckboxListItem
│     │     ├── CheckboxListItem.module.scss
│     │     └── CheckboxListItem.tsx
│     ├── CheckboxListPanel
│     │     ├── CheckboxListPanel.module.scss
│     │     └── CheckboxListPanel.tsx
│     ├── CheckboxListSearch
│     │     ├── CheckboxListSearch.module.scss
│     │     └── CheckboxListSearch.tsx
│     ├── ComponentsRenderer
│     │     ├── ComponentsRenderer.tsx
│     │     └── utilities.ts
│     ├── DemoBlock
│     │     ├── DemoBlock.module.scss
│     │     └── DemoBlock.tsx
│     ├── ErrorHandler
│     │     ├── ErrorHandler.module.scss
│     │     └── ErrorHandler.tsx
│     ├── Loader
│     │     ├── Loader.module.scss
│     │     └── Loader.tsx
│     └── PageTitle
│             └── PageTitle.tsx
├── hooks
│     ├── index.ts
│     ├── useCommonContext.ts
│     └── useLocalStorageState.ts
├── utilities
│     ├── convertFetchedState.ts
│     ├── fetchPageSchema.ts
│     └── index.ts
│
└── vite-env.d.ts

```

### App workflow description:
1. `App.tsx` is the first place the logic forks:
   - at first the `DemoBlock` call-to-action screen is shown;
   - after the user clicks `Get components` button -- starts the fetch request process, which is handled by the [react-query](https://tanstack.com/query/latest) hook.
2. Fetched data is prepared for more convenient further usage and passed to the `CommonContext` of the App (in `CommonContext.tsx`). 
   - Further access to the `CommonContext` of the App is available via `useCommonContext()` custom hook.
   - So, `CommonContext` exposes:
   - - `isPending` - fetch in-progress status;
   - - `error` - fetch error object (if fetch process fails);
   - - `commonPageSchema` - fetched and prepared data of `page-schema`;
   - - - `commonPageSchema` is stored in `localStorage` store with the help of `useLocalStorageState()` custom hook;
   - - `setCommonPageSchema()` - a `setState()`-like method to update the state of the `commonPageSchema`, also updates the state in `localStorage`;
3. `ComponentsRenderer.tsx` container component is the second place the logic forks:
   - if fetch process is in progress ( `isPending` ) -- the `Loader` screen is shown;
   - if fetch process shuts down with an error -- the `ErrorHandler` screen is shown to display error message;
   - if fetch process is done successfully -- a list of components is prepared and rendered
4. Order of rendering the components is defined directly by `page-schema`
5. For now there are two components available to render from the `page-schema`:
   - `PageTitle`: 
     - `PageTitle.tsx`
   - `CheckboxListPanel`:
     - `CheckboxListPanel.tsx`
       - - `CheckboxListSearch.tsx`
       - - `CheckboxList.tsx`
       - - - `CheckboxListItem.tsx`
6. `CheckboxList` and `CheckboxListSearch` share common state.
   - due to `useCommonContext()` custom hook we can access and update `commonPageSchema` state as needed
   - all the state changes are stored in `localStorage` for the case if a user accidentally closes the page
7. About `CheckboxListPanel` buttons:
   - `Reset` button -- resets selected state for all payment methods of the list and clean the search field
   - `Submit` button -- fires the `"onSubmit"` action from the `page-schema` to console and also logs to console the list of selected payment methods
