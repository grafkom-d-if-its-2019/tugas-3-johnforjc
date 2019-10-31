(function(){
  var canvas, gl, program, nWord, pindahX =0.0053, pindahY = 0.0053;

  glUtils.SL.init({ callback:function() { main(); } });

  function main() {
      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);

      initGlSize();

      // Initialize the shaders and program
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
      fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      gl.useProgram(program);

      nWord = initWordVertices();
      initCubeVertices();

      var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
      var scaleX = 1.0;
      gl.uniform1f(scaleXUniformLocation, scaleX);

      var constantUniformLocation = gl.getUniformLocation(program, 'constant');
      var constant = 0.5;
      gl.uniform1f(constantUniformLocation, constant);

      var jalanXUniformLocation = gl.getUniformLocation(program, 'jalanX');
      var jalanX = 0.00;
      gl.uniform1f(jalanXUniformLocation, jalanX);

      var jalanYUniformLocation = gl.getUniformLocation(program, 'jalanY');
      var jalanY = 0.00;
      gl.uniform1f(jalanYUniformLocation, jalanY);

      var jalanZUniformLocation = gl.getUniformLocation(program, 'jalanZ');
      var jalanZ = 0.00;
      gl.uniform1f(jalanZUniformLocation, jalanZ);

      render();
      window.addEventListener('resize', resizer);

      var vertexKiriTerjauh  = -0.15;
      var vertexKananTerjauh = 0.15;
      var vertexAtasTerjauh  = 0.30;
      var vertexBawahTerjauh = -0.6;
      var ukuranTerjauh = 0.5;

      function bounceChecking(){
          // Checking X koordinat
          if(constant*scaleX*vertexKiriTerjauh+jalanX>=ukuranTerjauh)
          {
              jalanX = ukuranTerjauh - constant*scaleX*vertexKiriTerjauh;
              pindahX = -1*pindahX;
          }
          else if(constant*scaleX*vertexKananTerjauh+jalanX>=ukuranTerjauh)
          {
              jalanX = ukuranTerjauh - constant*scaleX*vertexKananTerjauh;
              pindahX = -1*pindahX;
          }
          else if(constant*scaleX*vertexKiriTerjauh+jalanX<= -1*ukuranTerjauh)
          {
              jalanX = (-1 * ukuranTerjauh - constant*scaleX*vertexKiriTerjauh);
              pindahX = -1*pindahX;
          }
          else if(constant*scaleX*vertexKananTerjauh+jalanX<= -1*ukuranTerjauh)
          {
              jalanX = (-1 * ukuranTerjauh - constant*scaleX*vertexKananTerjauh);
              pindahX = -1*pindahX;   
          }

          // Checking Y koordinat
          if(constant * vertexAtasTerjauh +jalanY>=ukuranTerjauh)
          {
              jalanY = ukuranTerjauh - constant*vertexAtasTerjauh;
              pindahY = -1*pindahY;
          }
          else if(constant * vertexBawahTerjauh+jalanY<= -1*ukuranTerjauh)
          {
              jalanY = (-1 * ukuranTerjauh - constant*vertexBawahTerjauh);
              pindahY = -1*pindahY;
          }

          if(constant*vertexKiriTerjauh+jalanZ>=ukuranTerjauh)
            {
                jalanZ = ukuranTerjauh - constant*vertexKiriTerjauh;
                pindahZ = -1*pindahZ;
            }
            else if(constant*vertexKananTerjauh+jalanZ>=ukuranTerjauh)
            {
                jalanZ = ukuranTerjauh - constant*vertexKananTerjauh;
                pindahZ = -1*pindahZ;
            }
            else if(constant*vertexKiriTerjauh+jalanZ<= -1*ukuranTerjauh)
            {
                jalanZ = (-1 * ukuranTerjauh - constant*vertexKiriTerjauh);
                pindahZ = -1*pindahZ;
            }
            else if(constant*vertexKananTerjauh+jalanZ<= -1*ukuranTerjauh)
            {
                jalanZ = (-1 * ukuranTerjauh - constant*vertexKananTerjauh);
                pindahZ = -1*pindahZ;   
            }
            else if(constant * vertexAtasTerjauh +jalanZ>=ukuranTerjauh)
            {
                jalanZ = ukuranTerjauh - constant*vertexAtasTerjauh;
                pindahZ = -1*pindahZ;
            }
            else if(constant * vertexBawahTerjauh+jalanZ<= -1*ukuranTerjauh)
            {
                jalanZ = (-1 * ukuranTerjauh - constant*vertexBawahTerjauh);
                pindahZ = -1*pindahZ;
            }
      }

      function render(){
          gl.clearColor(0.364, 0.305, 1, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT);

          if (scaleX >= 1.0) melebar = -1.0;
          else if (scaleX <= -1.0) melebar = 1.0;
          scaleX += 0.0053 * melebar;

          jalanX += pindahX;
          jalanY += pindahY;

          bounceChecking();

          gl.uniform1f(jalanYUniformLocation, jalanY);
          gl.uniform1f(jalanXUniformLocation, jalanX);

          gl.uniform1f(scaleXUniformLocation, scaleX);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, nWord);
  
          requestAnimationFrame(render);
        }
  
      function initGlSize() {
          var width = canvas.getAttribute("width"), height = canvas.getAttribute("height");
          // Fullscreen if not set
          if (width) {
              gl.maxWidth = width;
          }
          if (height) {
              gl.maxHeight = height;
          }
      }
  
      function initWordVertices() {
          var vertices=[];
          var bagian_atas=[
              -0.15 , +0.30,
              -0.15 , +0.20,
              +0.15 , +0.20,
              +0.15 , +0.30,
              -0.15 , +0.30,
          ];
          
          var bagian_tegak=[
              -0.05 , +0.30,
              +0.05 , +0.30,
              +0.05 , -0.40,
              -0.05 , -0.40,
              -0.05 , +0.30,
          ];
          
          var vertexBuffer = gl.createBuffer(),
          lingkaran =[];
          
          for (var i=90.0; i<=270; i+=1) {
              var j = i * Math.PI / 180;
              var vert1 = [
                  Math.sin(j)*0.2-0.15,
                  Math.cos(j)*0.2-0.40,
              ];
              lingkaran=lingkaran.concat(vert1);
              
              var vert2 = [
                  Math.sin(j)*0.1-0.15,
                  Math.cos(j)*0.1-0.40,
              ];
              lingkaran=lingkaran.concat(vert2);
          }
          bagian_atas=bagian_atas.concat(bagian_tegak);
          vertices=vertices.concat(bagian_atas);
          vertices=vertices.concat(lingkaran);
          
          var n = vertices.length / 2;
          gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
          
          var vPosition = gl.getAttribLocation(program, 'vPosition');
          gl.enableVertexAttribArray(vPosition);
          gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
          
          return n;
      }

      function initCubeVertices() {
        var verticesCubePlane = [];
        var verticesCubeLine = [];
        console.log(verticesCubeLine);
        var cubePoints = [
            [ -0.5,  0.5,  0.5],
            [  0.5,  0.5,  0.5],
            [  0.5, -0.5,  0.5],
            [ -0.5, -0.5,  0.5],
            [ -0.5,  0.5,  -0.5],
            [  0.5,  0.5,  -0.5],
            [  0.5, -0.5,  -0.5],
            [ -0.5, -0.5,  -0.5],


            // [  0.5,  0.5,  0.5 ],
            // [  0.5, -0.5,  0.5 ],
            // [ -0.5,  0.5,  0.5 ],
            // [ -0.5, -0.5,  0.5 ],
            // [  0.5, -0.5, -0.5 ],
            // [  0.5,  0.5, -0.5 ],
            // [ -0.5,  0.5, -0.5 ],
            // [ -0.5, -0.5, -0.5 ]
        ];
        var cubeColors = [
            [1.00, 1.00, 1.00],
            [1.00, 1.00, 1.00], // merah
            [1.00, 1.00, 1.00], // hijau
            [1.00, 1.00, 1.00], // biru
            [1.00, 1.00, 1.00], // putih
            [1.00, 1.00, 1.00], // oranye
            [1.00, 1.00, 1.00], // kuning
            [1.00, 1.00, 1.00]
        ];
        var vertexBuffer = gl.createBuffer();

        function quad(a, b, c, d) {
            var indices = [a, b, c, a, c, d];
            for (var i=0; i < indices.length; i++) {
                for (var j=0; j < 3; j++) {
                    verticesCubePlane.push(cubePoints[indices[i]][j]);
                }
                for (var j=0; j < 3; j++) {
                    verticesCubePlane.push(cubeColors[a][j]);
                }
            }
        }

        function line(){
            var indices = [1, 0, 3, 2, 6, 7, 3, 0, 4, 7, 6, 5, 1, 2, 6, 5, 4, 5];
            console.log(indices.length);
            for (var i=0; i < indices.length; i++) {
                for (var j=0; j < 3; j++) {
                    verticesCubeLine.push(cubePoints[indices[i]][j]);
                }
                for (var j=0; j < 3; j++) {
                    verticesCubeLine.push(cubeColors[1][j]);
                }
            }
        }

        quad(1, 0, 3, 2);   // depan
        quad(2, 1, 5, 6);   // kanan
        quad(6, 5, 4, 7);   // belakang
        quad(7, 6, 2, 3);   // bawah
        quad(3, 7, 4, 0);   // kiri
        quad(0, 1, 5, 4);   // atas

        line();

        // console.log(verticesCube.length);
        // console.log(verticesCube);

        // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesCubePlane), gl.STATIC_DRAW);

        // Membuat sambungan untuk attribute
        var vPositionCubePlane = gl.getAttribLocation(program, 'vPositionCubePlane');
        var vColorCubePlane = gl.getAttribLocation(program, 'vColorCubePlane');
        gl.vertexAttribPointer(
            vPositionCubePlane,    // variabel yang memegang posisi attribute di shader
            3,            // jumlah elemen per atribut
            gl.FLOAT,     // tipe data atribut
            gl.FALSE, 
            6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
            0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColorCubePlane, 3, gl.FLOAT, gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPositionCubePlane);
        gl.enableVertexAttribArray(vColorCubePlane);

        var vertexBuffer2 = gl.createBuffer();

        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticesCubeLine), gl.STATIC_DRAW);

        var vPositionCubeLine = gl.getAttribLocation(program, 'vPositionCubeLine');
        var vColorCubeLine = gl.getAttribLocation(program, 'vColorCubeLine');
        gl.vertexAttribPointer(
            vPositionCubeLine,    // variabel yang memegang posisi attribute di shader
            3,            // jumlah elemen per atribut
            gl.FLOAT,     // tipe data atribut
            gl.FALSE, 
            6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
            0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColorCubeLine, 3, gl.FLOAT, gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPositionCubeLine);
        gl.enableVertexAttribArray(vColorCubeLine);
    }
  
      function resizer() {
          var width = canvas.getAttribute("width"), height = canvas.getAttribute("height");
          if (!width || width < 0) {
              canvas.width = window.innerWidth;
              gl.maxWidth = window.innerWidth;
          }
          if (!height || height < 0) {
              canvas.height = window.innerHeight;
              gl.maxHeight = window.innerHeight;
          }
          
          var min = Math.min.apply( Math, [gl.maxWidth, gl.maxHeight, window.innerWidth, window.innerHeight]);
          canvas.width = min;
          canvas.height = min;
          
          gl.viewport(0, 0, canvas.width, canvas.height);
      }
  }   
}) ();