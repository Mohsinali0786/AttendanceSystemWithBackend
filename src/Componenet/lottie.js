import React from 'react'
import Lottie from 'react-lottie';
import NODATA from "../Assets/jsons/ball.json"
const LottieControl = () => {
    return (

        <div>
            <Lottie
                options={{
                    autoplay: true,
                    animationData: NODATA,
                }
                }
                height={400}
                width={400}
            />
        </div>
    )

}
export default LottieControl 