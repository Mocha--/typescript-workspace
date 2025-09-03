export interface ContainerWidthLessThanParams {
  width: number;
  containerName: string | null;
}

export function containerWidthLessThan(params: ContainerWidthLessThanParams): string {
  const { width, containerName } = params;
  return containerName ? `${containerName} (width <= ${width}px)` : `(width <= ${width}px)`;
}

export interface ContainerWidthGreaterThanParams {
  width: number;
  containerName: string | null;
}

export function containerWidthGreaterThan(params: ContainerWidthGreaterThanParams): string {
  const { width, containerName } = params;
  return containerName ? `${containerName} (width >= ${width}px)` : `(width >= ${width}px)`;
}

export interface ContainerWidthBetweenParams {
  min: number;
  max: number;
  containerName: string | null;
}

export function containerWidthBetween(params: ContainerWidthBetweenParams): string {
  const { min, max, containerName } = params;
  return containerName ? `${containerName} (${min}px <= width <= ${max}px)` : `(${min}px <= width <= ${max}px)`;
}
