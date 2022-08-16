precision mediump float;
varying vec4 fragNormalPosition;
uniform sampler2D uSampler;
varying vec2 fragTexturePosition;
varying vec4 fragVertexPosition;
void main(){

    vec3 sun  = vec3(-10,10,0);

    vec4 color = texture2D(uSampler, fragTexturePosition);

    vec3 Normal = vec3(fragNormalPosition);
    vec3 Position = vec3(fragVertexPosition);

    vec3 PS = sun - Position;

    float intencity = 0.5 + 0.5 * dot(PS/length(PS), Normal/length(Normal));
    

    gl_FragColor = vec4(intencity* color.xyz,1);
}
