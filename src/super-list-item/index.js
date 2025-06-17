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

console.log('🚀 Super List Item block index.js loaded');
console.log('📋 Super List Item metadata:', metadata);
console.log('🔧 Super List Item Edit component:', Edit);
console.log('💾 Super List Item Save component:', Save);

/**
 * Export block configuration.
 */
export { metadata };
export const name = metadata.name;
export const settings = {
    edit: Edit,
    save: Save,
};

console.log('✅ Super List Item block configuration exported');
console.log('🏷️ Item Block name:', name);
console.log('⚙️ Item Block settings:', settings);