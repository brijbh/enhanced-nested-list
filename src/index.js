/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import * as superList from './super-list';
import * as superListItem from './super-list-item';

/**
 * Function to register a collection of blocks.
 */
const registerBlocks = () => {
    [
        superList,
        superListItem,
    ].forEach( ( block ) => {
        if ( ! block ) {
            return;
        }
        
        const { metadata, settings, name } = block;
        registerBlockType( { name, ...metadata }, settings );
    } );
};

registerBlocks();