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
 * Tested up to: 6.4
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
    
    error_log('📄 Script path: ' . $script_path);
    
    // Check if main build file exists
    $script_file_path = ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/index.js';
    if ( ! file_exists( $script_file_path ) ) {
        error_log('❌ Enhanced Super List: Main build/index.js file does not exist at: ' . $script_file_path);
        return;
    }
    
    wp_enqueue_script(
        'enhanced-super-list-editor',
        $script_path,
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        ENHANCED_SUPER_LIST_VERSION
    );
    error_log('✅ Editor script enqueued');

    // Only enqueue editor CSS if it exists
    $editor_css_path = ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/editor.css';
    if ( file_exists( $editor_css_path ) ) {
        wp_enqueue_style(
            'enhanced-super-list-editor',
            ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/editor.css',
            array( 'wp-edit-blocks' ),
            ENHANCED_SUPER_LIST_VERSION
        );
        error_log('✅ Editor style enqueued');
    } else {
        error_log('⚠️ Editor CSS file does not exist, skipping: ' . $editor_css_path);
    }
    
    error_log('🎉 Enhanced Super List: Block editor assets enqueued');
}
add_action( 'enqueue_block_editor_assets', 'enhanced_super_list_enqueue_block_editor_assets' );

/**
 * Enqueue frontend assets.
 */
function enhanced_super_list_enqueue_block_assets() {
    error_log('🌐 Enhanced Super List: Enqueuing frontend assets');
    
    // Only enqueue frontend CSS if it exists
    $frontend_css_path = ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/style.css';
    if ( file_exists( $frontend_css_path ) ) {
        wp_enqueue_style(
            'enhanced-super-list-style',
            ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/style.css',
            array(),
            ENHANCED_SUPER_LIST_VERSION
        );
        error_log('✅ Frontend style enqueued');
    } else {
        error_log('⚠️ Frontend CSS file does not exist, skipping: ' . $frontend_css_path);
    }
    
    error_log('🎉 Enhanced Super List: Frontend assets enqueued');
}
add_action( 'enqueue_block_assets', 'enhanced_super_list_enqueue_block_assets' );

error_log('🏁 Enhanced Super List: Plugin file loaded completely');