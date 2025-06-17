/**
 * WordPress dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * Save component for the Super List block.
 */
export default function Save( { attributes } ) {
    console.log('🔧 Super List Save component started');
    console.log('📊 Save attributes:', attributes);

    const {
        ordered,
        reversed,
        start,
        type,
        orientation,
        gap,
        itemSpacing
    } = attributes;

    console.log('🔧 Save - extracted attributes:', {
        ordered,
        reversed, 
        start,
        type,
        orientation,
        gap,
        itemSpacing
    });

    const TagName = ordered ? 'ol' : 'ul';
    console.log('🏷️ Save - TagName determined:', TagName);

    const blockProps = useBlockProps.save( {
        className: `is-orientation-${ orientation }`,
        style: {
            '--list-gap': gap ? `${ gap }px` : undefined,
            '--item-spacing': itemSpacing ? `${ itemSpacing }px` : undefined,
            listStyleType: type,
        }
    } );

    console.log('🎨 Save - blockProps:', blockProps);

    const innerBlocksProps = useInnerBlocksProps.save( {
        className: 'wp-block-enhanced-super-list-super-list__items'
    } );

    console.log('📦 Save - innerBlocksProps:', innerBlocksProps);

    const finalElement = (
        <TagName
            { ...blockProps }
            reversed={ ordered && reversed ? true : undefined }
            start={ ordered && start !== 1 ? start : undefined }
        >
            <div { ...innerBlocksProps } />
        </TagName>
    );

    console.log('✅ Super List Save component completed');
    console.log('🎯 Final element structure:', finalElement);

    return finalElement;
}