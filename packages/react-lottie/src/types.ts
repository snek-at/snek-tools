import {AnimationItem} from 'lottie-web'

export type LottieAnimationCreator = {
  animation: AnimationItem
}

export type LottieFn = (container: HTMLElement) => LottieFnResult
export type LottieFnFn = (...args: any[]) => LottieFn
export type LottieFnResult = {
  creator: LottieAnimationCreator
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

export type AnimationState = LottieAnimationCreator & {
  container: JSX.Element
}
