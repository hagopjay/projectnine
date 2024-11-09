export const shaders = {
  '0': {
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vec3 color = vec3(0.8 + 0.2 * sin(time), 0.2, 0.2);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  },
  '1': {
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        vec3 color = vec3(0.2, 0.5 + 0.3 * sin(time), 0.8);
        gl_FragColor = vec4(color * intensity, 1.0);
      }
    `
  },
  'default': {
    vertexShader: `
      varying vec3 vPosition;
      void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPosition;
      void main() {
        vec3 color = vec3(0.5 + 0.5 * sin(time + vPosition.x),
                         0.5 + 0.5 * sin(time + vPosition.y + 2.0),
                         0.5 + 0.5 * sin(time + vPosition.z + 4.0));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  }
};