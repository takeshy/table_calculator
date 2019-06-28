import { StoreState } from "../types/state";

type StoreKey = keyof StoreState;
const resources: StoreKey[] = ["formulas"];
const saveState = (store: any) => (next: any) => (action: any) => {
  const beforeState = store.getState();
  const beforeResource: any = {};
  resources.forEach(
    (resource: StoreKey) => (beforeResource[resource] = beforeState[resource])
  );

  const ret = next(action);

  const currentState = store.getState();
  let isChange = false;
  Object.keys(beforeResource).forEach(resource => {
    if (currentState[resource] !== beforeResource[resource]) {
      isChange = true;
    }
  });
  if (isChange) {
    const args: any = {};
    resources.forEach(res => {
      args[res] = currentState[res];
    });
    sessionStorage.setItem("app_state", JSON.stringify(args));
  }
  return ret;
};
export default saveState;
