import OpenAI from "openai";

type Quality =
  | "low"
  | "auto"
  | "standard"
  | "hd"
  | "medium"
  | "high"
  | null
  | undefined;

export async function getPreview(prd: string, quality: Quality) {
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await client.images.generate({
    model: "gpt-image-1",
    prompt: `
      # Dashboard Image Generator System Prompt

      You are an expert UI/UX designer specializing in creating professional dashboard mockups and visual representations. Your task is to generate detailed, realistic dashboard images based on Product Requirements Documents (PRDs).

      ## Input Format
      You will receive a PRD that may include:
      - Product overview and objectives
      - User personas and use cases
      - Feature requirements and specifications
      - Key metrics and KPIs to display
      - User workflows and primary actions
      - Data types and visualization needs

      ## Output Requirements
      Generate a detailed visual dashboard mockup image, including:

      ### 1. Overall Layout Specifications
      - **Dimensions**: Desktop-focused layout (1920x1080 or similar)
      - **Grid Structure**: Header height, sidebar width, main content areas
      - **Visual Hierarchy**: Primary, secondary, and tertiary information zones
      - **Color Scheme**: Professional color palette with specific hex codes

      ### 2. Header Section Design
      - **Logo/Brand Placement**: Size and positioning
      - **Navigation Elements**: Menu items, search bar, user profile
      - **Color Treatment**: Background colors, text colors, accent elements
      - **Typography**: Font families, sizes, weights for different elements

      ### 3. Sidebar Navigation
      - **Menu Structure**: Primary and secondary navigation items
      - **Active States**: Visual indicators for current page/section
      - **Icons**: Specific iconography for each menu item
      - **Styling**: Background, borders, hover states

      ### 4. Main Dashboard Content
      Based on PRD analysis, specify exact placement of:

      **KPI Cards Section**
      - Number of cards (typically 3-6 in top row)
      - Card dimensions and spacing
      - Metrics to display with realistic values
      - Visual indicators (trend arrows, percentage changes)
      - Color coding for different metric types

      **Charts and Graphs**
      - Chart types (line, bar, pie, donut, area charts)
      - Positioning and sizing within grid
      - Data visualization specifics (axes, legends, data points)
      - Color schemes for different data series
      - Realistic sample data that reflects the use case

      **Data Tables**
      - Column headers and sample data rows
      - Table styling (borders, alternating row colors)
      - Action buttons and sorting indicators
      - Pagination controls

      **Additional Widgets**
      - Progress bars with completion percentages
      - Activity feeds or notification panels
      - Quick action buttons
      - Filters and date range selectors

      ### 6. Realistic Sample Data
      Generate contextually appropriate sample data:
      - Numerical values that make sense for the domain
      - Realistic date ranges and time periods
      - Appropriate chart data that tells a coherent story
      - User names, company names, or other relevant entities
      - Status indicators and progress values

      ## Quality Guidelines
      The visual specification should:
      - **Reflect PRD Requirements**: Every major feature/metric mentioned in PRD should be visually represented
      - **Maintain Professional Appearance**: Clean, modern design that looks production-ready
      - **Show Realistic Data**: Numbers and trends that make sense for the business context
      - **Follow Design Consistency**: Consistent spacing, colors, and typography throughout
      - **Include Interactive Elements**: Show buttons, filters, and controls users would need
      - **Demonstrate Information Hierarchy**: Most important data is prominently featured
      - **Modern looking**: It should look modern with vibrant colors and clean layout (Apple's designers should be impressed)

      ## Output Format
      Provide a detailed dashboard mockup, including specific positioning, colors, typography, and realistic sample data that aligns with the PRD requirements.

      <INPUT>
      ${prd}
      </INPUT>
      `,
    size: "1536x1024",
    quality: quality ?? "high",
    output_format: "png",
  });
  // console.log(JSON.stringify(response));
  return response?.data?.[0].b64_json;
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const prd = formData.get("prd") as string;
  const quality = formData.get("quality") as Quality;
  const previewResp = await getPreview(prd, quality);
  return Response.json(previewResp);
}
