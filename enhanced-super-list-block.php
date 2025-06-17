<?php
/**
 * Plugin Name: Enhanced Super List Block
 * Plugin URI: https://yourwebsite.com/enhanced-super-list
 * Description: An enhanced version of Super List block with advanced nested list capabilities and extra features.
 * Version: 1.0.0
 * Author: Brijesh B
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: enhanced-super-list
 * Requires at least: 5.9
 * Tested up to: 6.8
 * Requires PHP: 7.4
 *
 * @package EnhancedSuperList
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
    error_log('🚫 Enhanced Super List: Direct access prevented');
    exit;
}

error_log('🚀 Enhanced Super List Plugin: Starting initialization');

// Define plugin constants.
define( 'ENHANCED_SUPER_LIST_VERSION', '1.0.0' );
define( 'ENHANCED_SUPER_LIST_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ENHANCED_SUPER_LIST_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

error_log('🔧 Enhanced Super List: Constants defined');
error_log('📁 Plugin Directory: ' . ENHANCED_SUPER_LIST_PLUGIN_DIR);
error_log('🌐 Plugin URL: ' . ENHANCED_SUPER_LIST_PLUGIN_URL);
error_log('📊 Plugin Version: ' . ENHANCED_SUPER_LIST_VERSION);

/**
 * Main plugin class.
 */
class Enhanced_Super_List {

    /**
     * Initialize the plugin.
     */
    public function __construct() {
        error_log('🏗️ Enhanced Super List: Class constructor called');
        add_action( 'init', array( $this, 'init' ) );
        error_log('✅ Enhanced Super List: Init action hook added');
    }

    /**
     * Initialize plugin functionality.
     */
    public function init() {
        error_log('🎯 Enhanced Super List: Init method called');
        
        // Register blocks.
        $this->register_blocks();

        // Load textdomain.
        $textdomain_loaded = load_plugin_textdomain( 'enhanced-super-list', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
        error_log('🌐 Enhanced Super List: Textdomain loaded: ' . ($textdomain_loaded ? 'SUCCESS' : 'FAILED'));
        
        error_log('✅ Enhanced Super List: Init method completed');
    }

    /**
     * Register all blocks.
     */
    public function register_blocks() {
        error_log('📦 Enhanced Super List: Starting block registration');
        
        $super_list_path = ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/super-list';
        $super_list_item_path = ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/super-list-item';
        
        error_log('🔍 Super List path: ' . $super_list_path);
        error_log('🔍 Super List Item path: ' . $super_list_item_path);
        
        // Check if build directories exist
        if ( ! file_exists( $super_list_path ) ) {
            error_log('❌ Enhanced Super List: Super List build directory does not exist');
        } else {
            error_log('✅ Enhanced Super List: Super List build directory exists');
        }
        
        if ( ! file_exists( $super_list_item_path ) ) {
            error_log('❌ Enhanced Super List: Super List Item build directory does not exist');
        } else {
            error_log('✅ Enhanced Super List: Super List Item build directory exists');
        }
        
        // Register the Super List block.
        try {
            $super_list_result = register_block_type( $super_list_path );
            error_log('✅ Enhanced Super List: Super List block registered successfully');
            error_log('📋 Super List block object: ' . print_r($super_list_result, true));
        } catch (Exception $e) {
            error_log('❌ Enhanced Super List: Failed to register Super List block - ' . $e->getMessage());
        }
        
        // Register the Super List Item block.
        try {
            $super_list_item_result = register_block_type( $super_list_item_path );
            error_log('✅ Enhanced Super List: Super List Item block registered successfully');
            error_log('📋 Super List Item block object: ' . print_r($super_list_item_result, true));
        } catch (Exception $e) {
            error_log('❌ Enhanced Super List: Failed to register Super List Item block - ' . $e->getMessage());
        }
        
        error_log('🎉 Enhanced Super List: Block registration completed');
    }
}

// Initialize the plugin.
error_log('🚀 Enhanced Super List: Creating plugin instance');
new Enhanced_Super_List();
error_log('✅ Enhanced Super List: Plugin instance created');

/**
 * Register block styles for enhanced customization.
 */
function enhanced_super_list_register_block_styles() {
    error_log('🎨 Enhanced Super List: Registering block styles');
    
    // Custom styles for the enhanced super list.
    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'grid-layout',
            'label' => __( 'Grid Layout', 'enhanced-super-list' ),
        )
    );
    error_log('✅ Grid Layout style registered');

    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'timeline',
            'label' => __( 'Timeline', 'enhanced-super-list' ),
        )
    );
    error_log('✅ Timeline style registered');

    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'checklist',
            'label' => __( 'Checklist', 'enhanced-super-list' ),
        )
    );
    error_log('✅ Checklist style registered');
    
    error_log('🎉 Enhanced Super List: All block styles registered');
}
add_action( 'init', 'enhanced_super_list_register_block_styles' );

/**
 * Enqueue block editor assets.
 */
function enhanced_super_list_enqueue_block_editor_assets() {
    error_log('📝 Enhanced Super List: Enqueuing block editor assets');
    
    $script_path = ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/index.js';
    $style_path = ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/editor.css';
    
    error_log('📄 Script path: ' . $script_path);
    error_log('🎨 Style path: ' . $style_path);
    
    wp_enqueue_script(
        'enhanced-super-list-editor',
        $script_path,
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        ENHANCED_SUPER_LIST_VERSION
    );
    error_log('✅ Editor script enqueued');

    wp_enqueue_style(
        'enhanced-super-list-editor',
        $style_path,
        array( 'wp-edit-blocks' ),
        ENHANCED_SUPER_LIST_VERSION
    );
    error_log('✅ Editor style enqueued');
    
    error_log('🎉 Enhanced Super List: Block editor assets enqueued');
}
add_action( 'enqueue_block_editor_assets', 'enhanced_super_list_enqueue_block_editor_assets' );

/**
 * Enqueue frontend assets.
 */
function enhanced_super_list_enqueue_block_assets() {
    error_log('🌐 Enhanced Super List: Enqueuing frontend assets');
    
    $frontend_style_path = ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/style.css';
    error_log('🎨 Frontend style path: ' . $frontend_style_path);
    
    wp_enqueue_style(
        'enhanced-super-list-style',
        $frontend_style_path,
        array(),
        ENHANCED_SUPER_LIST_VERSION
    );
    error_log('✅ Frontend style enqueued');
    
    error_log('🎉 Enhanced Super List: Frontend assets enqueued');
}
add_action( 'enqueue_block_assets', 'enhanced_super_list_enqueue_block_assets' );

error_log('🏁 Enhanced Super List: Plugin file loaded completely');