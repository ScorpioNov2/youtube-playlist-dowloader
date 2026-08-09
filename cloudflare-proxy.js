export default {
  async fetch(request) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", 
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === "POST") {
      try {
        const bodyText = await request.text();

        const cobaltResponse = await fetch("https://cobalt.tools", { 
          method: "POST",
          headers: { 
            "Accept": "application/json", 
            "Content-Type": "application/json" 
          },
          body: bodyText
        });

        const data = await cobaltResponse.json();
        
        return new Response(JSON.stringify(data), {
          status: cobaltResponse.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    return new Response("Chỉ chấp nhận phương thức POST", { status: 405 });
  }
};
