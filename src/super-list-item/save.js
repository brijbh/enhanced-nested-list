/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Save component for the Super List Item block.
 */
export default function Save( { attributes } ) {
    console.log('🔧 Super List Item Save component started');
    console.log('📊 Item Save attributes:', attributes);

    const {
        customMarker,
        markerIcon,
        markerColor,
        completed
    } = attributes;

    console.log('🔧 Item Save - extracted attributes:', {
        customMarker,
        markerIcon,
        markerColor,
        completed
    });

    const blockProps = useBlockProps.save( {
        className: [
            'wp-block-enhanced-super-list-super-list-item',
            completed ? 'is-completed' : '',
            customMarker ? 'has-custom-marker' : '',
            markerIcon ? 'has-marker-icon' : ''
        ].filter( Boolean ).join( ' ' )
    } );

    console.log('🎨 Item Save - blockProps:', blockProps);

    const innerBlocksProps = useInnerBlocksProps.save( {
        className: 'wp-block-enhanced-super-list-super-list-item__content'
    } );

    console.log('📦 Item Save - innerBlocksProps:', innerBlocksProps);

    const hasMarker = customMarker || markerIcon;
    console.log('🏷️ Item Save - hasMarker:', hasMarker);

    const finalElement = (
        <li { ...blockProps }>
            { hasMarker && (
                <span 
                    className="wp-block-enhanced-super-list-super-list-item__marker"
                    style={ { color: markerColor } }
                >
                    { markerIcon || customMarker }
                </span>
            ) }
            <div { ...innerBlocksProps } />
        </li>
    );

    console.log('✅ Super List Item Save component completed');
    console.log('🎯 Final item element structure:', finalElement);

    return finalElement;
}