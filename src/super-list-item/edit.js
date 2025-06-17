/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { 
    useBlockProps, 
    useInnerBlocksProps,
    InspectorControls,
    BlockControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    ColorPalette,
    ToggleControl,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import metadata from './block.json';

const TEMPLATE = [
    [ 'core/paragraph', { placeholder: __( 'Add content...', 'enhanced-super-list' ) } ]
];

/**
 * Edit component for the Super List Item block.
 */
function Edit( { attributes, setAttributes, clientId, context } ) {
    const {
        customMarker,
        markerIcon,
        markerColor,
        completed
    } = attributes;

    const {
        'enhanced-super-list/ordered': ordered,
        'enhanced-super-list/type': listType,
        'enhanced-super-list/orientation': orientation
    } = context;

    const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );
    const { getBlockRootClientId, getBlockIndex, getBlocks } = useSelect( 'core/block-editor' );

    const { hasInnerBlocks } = useSelect( ( select ) => {
        const { getBlockCount } = select( 'core/block-editor' );
        return {
            hasInnerBlocks: getBlockCount( clientId ) > 0,
        };
    }, [ clientId ] );

    const addListItem = () => {
        const rootClientId = getBlockRootClientId( clientId );
        const index = getBlockIndex( clientId );
        const newBlock = createBlock( 'enhanced-super-list/super-list-item' );
        insertBlock( newBlock, index + 1, rootClientId );
    };

    const removeListItem = () => {
        const rootClientId = getBlockRootClientId( clientId );
        const blocks = getBlocks( rootClientId );
        
        // Don't remove if it's the last item
        if ( blocks.length > 1 ) {
            removeBlock( clientId );
        }
    };

    const blockProps = useBlockProps( {
        className: [
            'wp-block-enhanced-super-list-super-list-item',
            completed ? 'is-completed' : '',
            customMarker ? 'has-custom-marker' : '',
            markerIcon ? 'has-marker-icon' : ''
        ].filter( Boolean ).join( ' ' )
    } );

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'wp-block-enhanced-super-list-super-list-item__content'
        },
        {
            template: hasInnerBlocks ? undefined : TEMPLATE,
            templateInsertUpdatesSelection: true,
            renderAppender: hasInnerBlocks ? undefined : false,
        }
    );

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus-alt"
                        label={ __( 'Add List Item After', 'enhanced-super-list' ) }
                        onClick={ addListItem }
                    />
                    <ToolbarButton
                        icon="no-alt"
                        label={ __( 'Remove List Item', 'enhanced-super-list' ) }
                        onClick={ removeListItem }
                        disabled={ ! useSelect( ( select ) => {
                            const rootClientId = getBlockRootClientId( clientId );
                            return select( 'core/block-editor' ).getBlocks( rootClientId ).length > 1;
                        }, [ clientId ] ) }
                    />
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={ __( 'List Item Settings', 'enhanced-super-list' ) }>
                    <TextControl
                        label={ __( 'Custom Marker Text', 'enhanced-super-list' ) }
                        value={ customMarker }
                        onChange={ ( value ) => setAttributes( { customMarker: value } ) }
                        help={ __( 'Override the default list marker with custom text.', 'enhanced-super-list' ) }
                    />

                    <TextControl
                        label={ __( 'Marker Icon (Unicode/Emoji)', 'enhanced-super-list' ) }
                        value={ markerIcon }
                        onChange={ ( value ) => setAttributes( { markerIcon: value } ) }
                        help={ __( 'Use an emoji or unicode character as marker.', 'enhanced-super-list' ) }
                        placeholder="✓ ➤ ★ →"
                    />

                    { ( customMarker || markerIcon ) && (
                        <div>
                            <label>{ __( 'Marker Color', 'enhanced-super-list' ) }</label>
                            <ColorPalette
                                value={ markerColor }
                                onChange={ ( value ) => setAttributes( { markerColor: value } ) }
                                clearable={ true }
                            />
                        </div>
                    ) }

                    <ToggleControl
                        label={ __( 'Mark as Completed', 'enhanced-super-list' ) }
                        checked={ completed }
                        onChange={ ( value ) => setAttributes( { completed: value } ) }
                        help={ __( 'Add a completed state styling to this item.', 'enhanced-super-list' ) }
                    />
                </PanelBody>
            </InspectorControls>

            <li { ...blockProps }>
                { ( customMarker || markerIcon ) && (
                    <span 
                        className="wp-block-enhanced-super-list-super-list-item__marker"
                        style={ { color: markerColor } }
                    >
                        { markerIcon || customMarker }
                    </span>
                ) }
                <div { ...innerBlocksProps } />
            </li>
        </>
    );
}

/**
 * Save component for the Super List Item block.
 */
function Save( { attributes } ) {
    const {
        customMarker,
        markerIcon,
        markerColor,
        completed
    } = attributes;

    const blockProps = useBlockProps.save( {
        className: [
            'wp-block-enhanced-super-list-super-list-item',
            completed ? 'is-completed' : '',
            customMarker ? 'has-custom-marker' : '',
            markerIcon ? 'has-marker-icon' : ''
        ].filter( Boolean ).join( ' ' )
    } );

    const innerBlocksProps = useInnerBlocksProps.save( {
        className: 'wp-block-enhanced-super-list-super-list-item__content'
    } );

    return (
        <li { ...blockProps }>
            { ( customMarker || markerIcon ) && (
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
}

/**
 * Export block configuration.
 */
export { metadata };
export const name = metadata.name;
export const settings = {
    edit: Edit,
    save: Save,
};