/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

console.log('🚀 Enhanced Super List: Main index.js started loading');
console.log('📦 registerBlockType function:', registerBlockType);

/**
 * Internal dependencies
 */
console.log('📥 Enhanced Super List: Importing block modules...');

import * as superList from './super-list';
console.log('✅ Super List module imported:', superList);

import * as superListItem from './super-list-item';
console.log('✅ Super List Item module imported:', superListItem);

/**
 * Function to register a collection of blocks.
 */
const registerBlocks = () => {
    console.log('🔧 Enhanced Super List: Starting block registration process');
    
    const blocks = [
        superList,
        superListItem,
    ];
    
    console.log('📋 Blocks to register:', blocks);
    
    blocks.forEach( ( block, index ) => {
        console.log(`🔄 Processing block ${index + 1}:`, block);
        
        if ( ! block ) {
            console.error(`❌ Block ${index + 1} is null or undefined:`, block);
            return;
        }
        
        const { metadata, settings, name } = block;
        
        console.log(`📋 Block ${index + 1} metadata:`, metadata);
        console.log(`⚙️ Block ${index + 1} settings:`, settings);
        console.log(`🏷️ Block ${index + 1} name:`, name);
        
        if (!metadata) {
            console.error(`❌ Block ${index + 1} missing metadata:`, block);
            return;
        }
        
        if (!settings) {
            console.error(`❌ Block ${index + 1} missing settings:`, block);
            return;
        }
        
        if (!name) {
            console.error(`❌ Block ${index + 1} missing name:`, block);
            return;
        }
        
        try {
            console.log(`🚀 Registering block: ${name}`);
            const registrationResult = registerBlockType( { name, ...metadata }, settings );
            console.log(`✅ Block registered successfully: ${name}`, registrationResult);
        } catch (error) {
            console.error(`❌ Failed to register block: ${name}`, error);
            console.error('📊 Error details:', {
                message: error.message,
                stack: error.stack,
                name: error.name
            });
        }
    } );
    
    console.log('🎉 Enhanced Super List: Block registration process completed');
};

console.log('🎯 Enhanced Super List: Calling registerBlocks function');
registerBlocks();
console.log('✅ Enhanced Super List: Main index.js completed loading');