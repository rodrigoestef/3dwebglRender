precision mediump float;
varying vec4 fragNormalPosition;

void main(){

    vec3 sun  = vec3(1,1,-1);

    vec3 color =  vec3(1,1,1);

    vec3 Normal = vec3(fragNormalPosition);

    float intencity = 0.5 + 0.5 * dot(sun/length(sun), Normal/length(Normal));
    

    gl_FragColor = vec4(intencity* color, 1);
}