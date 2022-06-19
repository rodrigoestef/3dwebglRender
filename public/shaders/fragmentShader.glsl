precision mediump float;
varying vec4 fragNormalPosition;

void main(){

    vec3 sun  = vec3(0,0,-1);

    vec3 color =  vec3(1,1,1);

    float intencity = 0.5 + 0.5 * dot(sun, vec3(fragNormalPosition));
    

    gl_FragColor = vec4(intencity* color, 1);
}