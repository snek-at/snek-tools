import lottie, {
  AnimationConfigWithData,
  AnimationConfigWithPath
} from 'lottie-web'
import React, {useRef, useState, useEffect} from 'react'

import {
  AnimationState,
  LottieAnimationCreator,
  LottieFn,
  LottieFnFn,
  LottieFnResult
} from './types'

export type {
  AnimationState,
  LottieAnimationCreator,
  LottieFn,
  LottieFnFn,
  LottieFnResult
}

export const createLottie = (
  params: AnimationConfigWithData | AnimationConfigWithPath
): LottieAnimationCreator => {
  const animation = lottie.loadAnimation({autoplay: false, ...params})

  return {animation}
}

type AnimationProps = {
  lottie: LottieFn
  children: (state: AnimationState) => JSX.Element
  forceReloadDeps?: unknown[]
}

export const Lottie: React.FC<AnimationProps> = ({
  children,
  lottie,
  forceReloadDeps
}) => {
  const divRef = useRef<HTMLDivElement | null>(null)

  const [lottieResult, setLottieResult] = useState<LottieFnResult | null>(null)

  useEffect(() => {
    if (lottieResult && lottieResult.creator) {
      lottieResult && lottieResult.creator.animation.destroy()
    }

    if (divRef.current) {
      setLottieResult(lottie(divRef.current))
    }
  }, forceReloadDeps || [])

  return children({
    container: (
      <div
        ref={divRef}
        {...(lottieResult && lottieResult.containerProps)}></div>
    ),
    animation:
      lottieResult &&
      lottieResult.creator &&
      (lottieResult.creator.animation as any)
  })
}
