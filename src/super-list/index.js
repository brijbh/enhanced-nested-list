/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

console.log('🚀 Super List block index.js loaded');
console.log('📋 Super List metadata:', metadata);
console.log('🔧 Super List Edit component:', Edit);
console.log('💾 Super List Save component:', Save);

/**
 * Export block configuration.
 */
export { metadata };
export const name = metadata.name;
export const settings = {
    edit: Edit,
    save: Save,
};

console.log('✅ Super List block configuration exported');
console.log('🏷️ Block name:', name);
console.log('⚙️ Block settings:', settings);