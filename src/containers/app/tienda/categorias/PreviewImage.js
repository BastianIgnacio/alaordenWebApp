/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import React from 'react';

const PreviewImage = ({ base64 }) => {
    // console.log(base64);
    return (
        <div className='text-center'>
            <img className='img-thumbnail' src={base64} alt="preview" width="300px" height="300px" />
        </div>
    );
};
export default PreviewImage;
