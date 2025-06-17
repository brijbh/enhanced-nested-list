<?php
/**
 * Plugin Name: Enhanced Super List Block
 * Plugin URI: https://yourwebsite.com/enhanced-super-list
 * Description: An enhanced version of Super List block with advanced nested list capabilities and extra features.
 * Version: 1.0.0
 * Author: Your Name
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
    exit;
}

// Define plugin constants.
define( 'ENHANCED_SUPER_LIST_VERSION', '1.0.0' );
define( 'ENHANCED_SUPER_LIST_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'ENHANCED_SUPER_LIST_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Main plugin class.
 */
class Enhanced_Super_List {

    /**
     * Initialize the plugin.
     */
    public function __construct() {
        add_action( 'init', array( $this, 'init' ) );
    }

    /**
     * Initialize plugin functionality.
     */
    public function init() {
        // Register blocks.
        $this->register_blocks();

        // Load textdomain.
        load_plugin_textdomain( 'enhanced-super-list', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
    }

    /**
     * Register all blocks.
     */
    public function register_blocks() {
        // Register the Super List block.
        register_block_type( ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/super-list' );
        
        // Register the Super List Item block.
        register_block_type( ENHANCED_SUPER_LIST_PLUGIN_DIR . 'build/super-list-item' );
    }
}

// Initialize the plugin.
new Enhanced_Super_List();

/**
 * Register block styles for enhanced customization.
 */
function enhanced_super_list_register_block_styles() {
    // Custom styles for the enhanced super list.
    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'grid-layout',
            'label' => __( 'Grid Layout', 'enhanced-super-list' ),
        )
    );

    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'timeline',
            'label' => __( 'Timeline', 'enhanced-super-list' ),
        )
    );

    register_block_style(
        'enhanced-super-list/super-list',
        array(
            'name'  => 'checklist',
            'label' => __( 'Checklist', 'enhanced-super-list' ),
        )
    );
}
add_action( 'init', 'enhanced_super_list_register_block_styles' );

/**
 * Enqueue block editor assets.
 */
function enhanced_super_list_enqueue_block_editor_assets() {
    wp_enqueue_script(
        'enhanced-super-list-editor',
        ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/index.js',
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ),
        ENHANCED_SUPER_LIST_VERSION
    );

    wp_enqueue_style(
        'enhanced-super-list-editor',
        ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/editor.css',
        array( 'wp-edit-blocks' ),
        ENHANCED_SUPER_LIST_VERSION
    );
}
add_action( 'enqueue_block_editor_assets', 'enhanced_super_list_enqueue_block_editor_assets' );

/**
 * Enqueue frontend assets.
 */
function enhanced_super_list_enqueue_block_assets() {
    wp_enqueue_style(
        'enhanced-super-list-style',
        ENHANCED_SUPER_LIST_PLUGIN_URL . 'build/style.css',
        array(),
        ENHANCED_SUPER_LIST_VERSION
    );
}
add_action( 'enqueue_block_assets', 'enhanced_super_list_enqueue_block_assets' );