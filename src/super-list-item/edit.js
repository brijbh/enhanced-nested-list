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

const TEMPLATE = [
    [ 'core/paragraph', { placeholder: __( 'Add content...', 'enhanced-super-list' ) } ]
];

/**
 * Edit component for the Super List Item block.
 */
export default function Edit( { attributes, setAttributes, clientId, context } ) {
    console.log('🔧 Super List Item Edit component started');
    console.log('📊 Item Edit attributes:', attributes);
    console.log('🆔 Item Client ID:', clientId);
    console.log('🔗 Item Context:', context);

    const {
        customMarker,
        markerIcon,
        markerColor,
        completed
    } = attributes;

    console.log('🔧 Item Edit - extracted attributes:', {
        customMarker,
        markerIcon,
        markerColor,
        completed
    });

    const {
        'enhanced-super-list/ordered': ordered,
        'enhanced-super-list/type': listType,
        'enhanced-super-list/orientation': orientation
    } = context;

    console.log('🔗 Item Edit - context values:', {
        ordered,
        listType,
        orientation
    });

    const { insertBlock, removeBlock } = useDispatch( 'core/block-editor' );
    const { getBlockRootClientId, getBlockIndex, getBlocks } = useSelect( 'core/block-editor' );

    const { hasInnerBlocks } = useSelect( ( select ) => {
        const { getBlockCount } = select( 'core/block-editor' );
        return {
            hasInnerBlocks: getBlockCount( clientId ) > 0,
        };
    }, [ clientId ] );

    console.log('📦 Item has inner blocks:', hasInnerBlocks);

    const addListItem = () => {
        console.log('➕ Adding new list item after current');
        const rootClientId = getBlockRootClientId( clientId );
        const index = getBlockIndex( clientId );
        const newBlock = createBlock( 'enhanced-super-list/super-list-item' );
        insertBlock( newBlock, index + 1, rootClientId );
    };

    const removeListItem = () => {
        console.log('🗑️ Attempting to remove list item');
        const rootClientId = getBlockRootClientId( clientId );
        const blocks = getBlocks( rootClientId );
        
        // Don't remove if it's the last item
        if ( blocks.length > 1 ) {
            console.log('✅ Removing list item (not the last one)');
            removeBlock( clientId );
        } else {
            console.log('⚠️ Cannot remove last list item');
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

    console.log('🎨 Item blockProps:', blockProps);

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

    console.log('📦 Item innerBlocksProps:', innerBlocksProps);
    console.log('✅ Super List Item Edit component rendering');

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