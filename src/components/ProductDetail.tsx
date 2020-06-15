import React, { FunctionComponent } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import data from '../data';

type Params = {
    id: string;
}

const ProductDetail: FunctionComponent<RouteComponentProps<Params>> = ({match}) => {
    
    const product = data.products.find(product => product.id === +match.params.id)
    
    return (
        <div>
            {product?.name}
        </div>
    )
}

export default ProductDetail;