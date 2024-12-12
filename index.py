import os
import math
from PIL import Image, ImageOps
import cairosvg

def svg_to_png(svg_file, png_file, width, height):
    """Convert an SVG file to a PNG file with specified dimensions."""
    cairosvg.svg2png(url=svg_file, write_to=png_file, output_width=width, output_height=height)

def generate_tiles(input_svg, output_folder, tile_size=256, zoom_levels=5):
    """Generate TMS tiles from an SVG file."""
    # Ensure output directory exists
    os.makedirs(output_folder, exist_ok=True)

    # Convert SVG to a base PNG with the maximum required dimensions
    max_dim = tile_size * (2 ** (zoom_levels - 1))
    temp_png = os.path.join(output_folder, "temp.png")
    svg_to_png(input_svg, temp_png, max_dim, max_dim)

    # Open the PNG image
    base_image = Image.open(temp_png)
    base_width, base_height = base_image.size

    # Check and handle aspect ratio issues
    if base_width != base_height:
        max_dim = max(base_width, base_height)
        square_image = Image.new("RGBA", (max_dim, max_dim), (128, 128, 128, 255))  # Gray background
        offset_x = (max_dim - base_width) // 2
        offset_y = (max_dim - base_height) // 2
        square_image.paste(base_image, (offset_x, offset_y))
        base_image = square_image
        base_width, base_height = base_image.size

    # Generate tiles for each zoom level
    for zoom in range(zoom_levels):
        num_tiles = 2 ** zoom
        zoom_folder = os.path.join(output_folder, str(zoom))
        os.makedirs(zoom_folder, exist_ok=True)

        tile_scale = base_width // num_tiles

        for x in range(num_tiles):
            for y in range(num_tiles):
                left = x * tile_scale
                upper = y * tile_scale
                right = left + tile_scale
                lower = upper + tile_scale

                tile = base_image.crop((left, upper, right, lower))
                tile = tile.resize((tile_size, tile_size), Image.ANTIALIAS)

                tile_path = os.path.join(zoom_folder, f"{x}_{y}.png")
                tile.save(tile_path)

    # Clean up temporary PNG
    os.remove(temp_png)

# Example usage
input_svg = "SVG_Human_With_All_Organs.svg"  # Path to your input SVG file
output_folder = "output_tiles"  # Directory to save the tiles
generate_tiles(input_svg, output_folder)
