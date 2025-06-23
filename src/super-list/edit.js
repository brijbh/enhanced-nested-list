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
    ToggleControl,
    SelectControl,
    RangeControl,
    ToolbarGroup,
    ToolbarButton
} from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

const ALLOWED_BLOCKS = [ 'enhanced-super-list/super-list-item' ];
const TEMPLATE = [
    [ 'enhanced-super-list/super-list-item' ],
    [ 'enhanced-super-list/super-list-item' ]
];

/**
 * Edit component for the Super List block.
 */
export default function Edit( { attributes, setAttributes, clientId } ) {
    console.log('🔧 Super List Edit component started');
    console.log('📊 Edit attributes:', attributes);
    console.log('🆔 Client ID:', clientId);

    const {
        ordered,
        reversed,
        start,
        type,
        orientation,
        gap,
        itemSpacing
    } = attributes;

    console.log('🔧 Edit - extracted attributes:', {
        ordered,
        reversed, 
        start,
        type,
        orientation,
        gap,
        itemSpacing
    });

    const { insertBlock } = useDispatch( 'core/block-editor' );
    
    const { hasInnerBlocks } = useSelect( ( select ) => {
        const { getBlockCount } = select( 'core/block-editor' );
        return {
            hasInnerBlocks: getBlockCount( clientId ) > 0,
        };
    }, [ clientId ] );

    console.log('📦 Has inner blocks:', hasInnerBlocks);

    const listTypeOptions = [
        { label: __( 'Disc', 'enhanced-super-list' ), value: 'disc' },
        { label: __( 'Circle', 'enhanced-super-list' ), value: 'circle' },
        { label: __( 'Square', 'enhanced-super-list' ), value: 'square' },
        { label: __( 'Decimal', 'enhanced-super-list' ), value: 'decimal' },
        { label: __( 'Lower Alpha', 'enhanced-super-list' ), value: 'lower-alpha' },
        { label: __( 'Upper Alpha', 'enhanced-super-list' ), value: 'upper-alpha' },
        { label: __( 'Lower Roman', 'enhanced-super-list' ), value: 'lower-roman' },
        { label: __( 'Upper Roman', 'enhanced-super-list' ), value: 'upper-roman' },
        { label: __( 'None', 'enhanced-super-list' ), value: 'none' },
    ];

    const addListItem = () => {
        console.log('➕ Adding new list item');
        const newBlock = createBlock( 'enhanced-super-list/super-list-item' );
        insertBlock( newBlock, undefined, clientId );
    };

    const TagName = ordered ? 'ol' : 'ul';
    console.log('🏷️ TagName determined:', TagName);

    const blockProps = useBlockProps( {
        className: `is-orientation-${ orientation }`,
        style: {
            '--list-gap': gap ? `${ gap }px` : undefined,
            '--item-spacing': itemSpacing ? `${ itemSpacing }px` : undefined,
        }
    } );

    console.log('🎨 blockProps:', blockProps);

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'wp-block-enhanced-super-list-super-list__items'
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            template: hasInnerBlocks ? undefined : TEMPLATE,
            templateInsertUpdatesSelection: true,
            orientation: orientation === 'horizontal' ? 'horizontal' : 'vertical',
        }
    );

    console.log('📦 innerBlocksProps:', innerBlocksProps);

    console.log('✅ Super List Edit component rendering');

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        icon="plus-alt"
                        label={ __( 'Add List Item', 'enhanced-super-list' ) }
                        onClick={ addListItem }
                    />
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={ __( 'List Settings', 'enhanced-super-list' ) }>
                    <ToggleControl
                        label={ __( 'Ordered List', 'enhanced-super-list' ) }
                        checked={ ordered }
                        onChange={ ( value ) => setAttributes( { ordered: value } ) }
                    />
                    
                    { ordered && (
                        <>
                            <ToggleControl
                                label={ __( 'Reversed', 'enhanced-super-list' ) }
                                checked={ reversed }
                                onChange={ ( value ) => setAttributes( { reversed: value } ) }
                            />
                            <RangeControl
                                label={ __( 'Start Number', 'enhanced-super-list' ) }
                                value={ start }
                                onChange={ ( value ) => setAttributes( { start: value } ) }
                                min={ 1 }
                                max={ 100 }
                            />
                        </>
                    ) }

                    <SelectControl
                        label={ __( 'List Style Type', 'enhanced-super-list' ) }
                        value={ type }
                        options={ listTypeOptions }
                        onChange={ ( value ) => setAttributes( { type: value } ) }
                    />
                </PanelBody>

                <PanelBody title={ __( 'Layout Settings', 'enhanced-super-list' ) }>
                    <SelectControl
                        label={ __( 'Orientation', 'enhanced-super-list' ) }
                        value={ orientation }
                        options={ [
                            { label: __( 'Vertical', 'enhanced-super-list' ), value: 'vertical' },
                            { label: __( 'Horizontal', 'enhanced-super-list' ), value: 'horizontal' },
                        ] }
                        onChange={ ( value ) => setAttributes( { orientation: value } ) }
                    />

                    <RangeControl
                        label={ __( 'Gap Between Items', 'enhanced-super-list' ) }
                        value={ gap }
                        onChange={ ( value ) => setAttributes( { gap: value } ) }
                        min={ 0 }
                        max={ 100 }
                        step={ 2 }
                    />

                    <RangeControl
                        label={ __( 'Item Internal Spacing', 'enhanced-super-list' ) }
                        value={ itemSpacing }
                        onChange={ ( value ) => setAttributes( { itemSpacing: value } ) }
                        min={ 0 }
                        max={ 50 }
                        step={ 1 }
                    />
                </PanelBody>
            </InspectorControls>

            <TagName
                { ...blockProps }
                reversed={ ordered && reversed ? true : undefined }
                start={ ordered && start !== 1 ? start : undefined }
                style={ {
                    ...blockProps.style,
                    listStyleType: type,
                } }
            >
                <div { ...innerBlocksProps } />
            </TagName>
        </>
    );
}